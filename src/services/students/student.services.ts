import type {
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentQueryDTO,
  ExpressParamID,
} from "../../types/index.types.js";
import { PoolStudentRepo } from "../../repositories/students/student.repositories.js";
import { assertFound } from "../../errors/assertFound.js";
import { parseParamID } from "../../http/parseParamID.js";

const repo = new PoolStudentRepo();

const getAllStudentService = (query: StudentQueryDTO) => {
  return repo.getAll(query);
};
const createNewStudentService = (data: CreateStudentDTO) => {
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
