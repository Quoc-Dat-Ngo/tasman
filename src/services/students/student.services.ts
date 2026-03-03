import type {
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentQueryDTO,
  ExpressParamID,
} from "../../types/index.types";
import AppError from "../../errors/AppError";
import { PoolStudentRepo } from "../../repositories/students/student.repositories";
import { assertFound } from "../../errors/assertFound";
import { parseParamID } from "../../http/parseParamID";

const repo = new PoolStudentRepo();

const getAllStudentService = (query: StudentQueryDTO) => {
  return repo.getAll(query);
};
const createNewStudentService = (data: CreateStudentDTO) => {
  // TODO: Perform input validation and password hashing for student account
  return repo.create(data);
};
const getSingleStudentService = async (id: ExpressParamID) => {
  const student_id = parseParamID(id);
  return assertFound(
    await repo.getOne(student_id),
    `Student with id ${student_id} not found`,
  );
};

const updateStudentService = async (
  id: ExpressParamID,
  data: UpdateStudentDTO,
) => {
  const student_id = parseParamID(id);
  if (Object.values(data).every((v) => v === undefined)) {
    throw new AppError("No fields provided for updating", 400);
  }
  return assertFound(
    await repo.update(student_id, data),
    `Student with id ${student_id} not found`,
  );
};
const deleteStudentService = async (id: ExpressParamID) => {
  const student_id = parseParamID(id);
  return assertFound(
    await repo.delete(student_id),
    `Student with id ${student_id} not found`,
  );
};
const getStudentCourseService = async (id: ExpressParamID) => {
  const student_id = parseParamID(id);
  return assertFound(
    await repo.getCourse(student_id),
    `Student with id ${student_id} not found OR student hasn't applied for any courses yet`,
  );
};
const getStudentMajorService = async (id: ExpressParamID) => {
  const student_id = parseParamID(id);
  return assertFound(
    await repo.getMajor(student_id),
    `Student with id ${student_id} not found OR student hasn't registered for any majors yet`,
  );
};

export {
  createNewStudentService,
  getAllStudentService,
  getSingleStudentService,
  updateStudentService,
  deleteStudentService,
  getStudentCourseService,
  getStudentMajorService,
};
