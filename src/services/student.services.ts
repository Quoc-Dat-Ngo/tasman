import type {
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentQueryDTO,
  ExpressParamID,
} from "../types";
import AppError from "../errors/AppError";
import { PoolStudentRepo } from "../repositories/students/student.repositories";
import { assertFound } from "../errors/assertFound";
import { parseParamID } from "../http/parseParamID";

const repo = new PoolStudentRepo();

const getAllStudentService = async (query: StudentQueryDTO) => {
  return repo.getAll(query);
};
const createNewStudentService = async (data: CreateStudentDTO) => {
  // TODO: Perform input validation and password hashing for student account
  return repo.create(data);
};
const getSingleStudentService = async (id: ExpressParamID) => {
  const student_id = parseParamID(id);
  return assertFound(
    repo.getOne(student_id),
    `Student with id ${student_id} not found`,
  );
};

const updateStudentService = async (
  id: ExpressParamID,
  body: UpdateStudentDTO,
) => {
  const student_id = parseParamID(id);
  if (Object.values(body).every((v) => v === undefined)) {
    throw new AppError("No fields provided for updating", 400);
  }
  return assertFound(
    repo.update(student_id, body),
    `Student with id ${student_id} not found`,
  );
};
const deleteStudentService = async (id: ExpressParamID) => {
  const student_id = parseParamID(id);
  return assertFound(
    repo.delete(student_id),
    `Student with id ${student_id} not found`,
  );
};
const getStudentCourseService = async (id: ExpressParamID) => {
  const student_id = parseParamID(id);
  return assertFound(
    repo.getCourse(student_id),
    `Student with id ${student_id} not found`,
  );
};
const getStudentMajorService = async (id: ExpressParamID) => {
  const student_id = parseParamID(id);
  return assertFound(
    repo.getMajor(student_id),
    `Student with id ${student_id} not found`,
  );
};
// const enrollCourse = async (
//   studentId: IDType,
//   courseId: IDType,
// ): Promise<Enrollment[]> => {
//   const result = await pool.query<Enrollment>(
//     `
//       INSERT INTO enrollments (student_id, course_id)
//       VALUES ($1, $2)
//       RETURNING *;`,
//     [studentId, courseId],
//   );
//   return result.rows;
// };
// const majorRegistration = async (studentId: IDType, majorId: IDType) => {
//   const result = await pool.query<StudentMajor>(
//     `
//     INSERT INTO student_major (student_id, major_id)
//     VALUES ($1, $2)
//     RETURNING *;
//     `,
//     [studentId, majorId],
//   );
//   return result.rows;
// };

export {
  createNewStudentService,
  getAllStudentService,
  getSingleStudentService,
  updateStudentService,
  deleteStudentService,
  getStudentCourseService,
  getStudentMajorService,
};
