import type { CreateUserDTO } from "../../types/user.types";
import { PoolAdminRepo } from "./admin.repositories";
import argon2 from "argon2";

const repo = new PoolAdminRepo();

export async function createUserService(data: CreateUserDTO) {
  const hashed_password = await argon2.hash(data.user_password);

  const newUser: CreateUserDTO = {
    user_email: data.user_email,
    user_password: hashed_password,
    role_id: data.role_id,
    linked_student_id: data.linked_student_id,
    linked_instructor_id: data.linked_instructor_id,
  };

  return await repo.create(newUser);
}
