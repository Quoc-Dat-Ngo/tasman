import argon2 from "argon2";
import type { LoginDTO, RegisterDTO } from "./jwt_auth/auth.types";
import { PoolAuthRepo } from "./auth.repositories";
import AppError from "../../errors/AppError";
import type { CreateUserDTO } from "../../types/user.types";
import { createAccessToken, createRefreshToken } from "../../utils/auth.utils";
import { PoolRoleRepo } from "../authz/roles/role.repositories";
import { PoolPermissionRepo } from "../authz/permissions/permission.repositories";
import { PoolStudentRepo } from "../../repositories/students/student.repositories";
import { PoolInstructorRepo } from "../../repositories/instructors/instructor.repositories";
import { PoolAdminRepo } from "../admin/admin.repositories";

const authRepo = new PoolAuthRepo();
const roleRepo = new PoolRoleRepo();
const permissionRepo = new PoolPermissionRepo();
const studentRepo = new PoolStudentRepo();
const instructorRepo = new PoolInstructorRepo();
const adminRepo = new PoolAdminRepo();

async function loginService(data: LoginDTO) {
  const user = await adminRepo.checkUserExistence(data.email);
  if (!user) {
    throw new AppError("User does not exist. Please register", 404);
  }

  const isPasswordMatch = await argon2.verify(
    user.user_password,
    data.password,
  );
  if (!isPasswordMatch) {
    throw new AppError("Wrong password, please try again", 400);
  }

  // Get role string from id
  const role = await roleRepo.getRoleName(user.role_id);
  if (!role)
    throw new AppError("Registered role did not exist in the system", 404);

  // Get list of permissions
  const permission = await permissionRepo.getPermissionList(user.role_id);
  const list = permission.map((record) => record.permission).flat();

  // Successfull credentials authentication (email + password exist)
  const accessToken = createAccessToken(user.user_id, role.role_name, list);
  const refreshToken = createRefreshToken(user.user_id, role.role_name, list);

  // Hash refreshToken to ensure security
  const hashed_token = await argon2.hash(refreshToken);

  // Set default expiry date for refreshToken is 7-day
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const expiry = new Date(Date.now() + sevenDays);
  // Store refreshToken in refresh_tokens table
  await authRepo.insertRefreshToken(user.user_id, hashed_token, expiry);

  return { email: data.email, accessToken, refreshToken };
}

async function registerService(data: RegisterDTO) {
  // Check if user already existed
  const user = await adminRepo.checkUserExistence(data.email);
  if (user) {
    throw new AppError("User already existed", 400);
  }

  // Check whether an associated student_id or instructor_id exists or not
  const student = await studentRepo.checkStudentExistence(
    data.first_name,
    data.last_name,
  );
  const instructor = await instructorRepo.checkInstructorExistence(
    data.first_name,
    data.last_name,
  );

  let linked_student_id: number | null = null;
  let linked_instructor_id: number | null = null;
  if (!student && !instructor) {
    throw new AppError(
      "Only internal students and staffs have access to this resource",
      401,
    );
  }

  let role_id = 0;
  if (student) {
    linked_student_id = student.student_id;
    role_id = 2;
  }
  if (instructor) {
    linked_instructor_id = instructor.instructor_id;
    role_id = 3;
  }

  const hashed_password = await argon2.hash(data.password);

  const newUser: CreateUserDTO = {
    user_email: data.email,
    user_password: hashed_password,
    role_id,
    linked_student_id,
    linked_instructor_id,
  };

  return await authRepo.register(newUser);
}

export { loginService, registerService };
