import AppError from "../../errors/AppError.js";
import { assertFound } from "../../errors/assertFound.js";
import { parseParamID } from "../../http/parseParamID.js";
import { PoolInstructorRepo } from "../../repositories/instructors/instructor.repositories.js";
import type {
  BaseQuery,
  CreateInstructorDTO,
  ExpressParamID,
  UpdateInstructorDTO,
} from "../../types/index.types.js";

const repo = new PoolInstructorRepo();

const getAllInstructorService = (query: BaseQuery) => {
  return repo.getAll(query);
};
const createNewInstructorService = (data: CreateInstructorDTO) => {
  return repo.create(data);
};
const getSingleInstructorService = async (id: ExpressParamID) => {
  const instructor_id = parseParamID(id);
  return assertFound(
    await repo.getOne(instructor_id),
    `Instructor with id ${instructor_id} not found`,
  );
};
const updateInstructorService = async (
  id: ExpressParamID,
  data: UpdateInstructorDTO,
) => {
  const instructor_id = parseParamID(id);
  if (Object.values(data).every((d) => d === undefined)) {
    throw new AppError(
      "No input updated data for all fields, please select CANCEL",
      400,
    );
  }
  return assertFound(
    await repo.update(instructor_id, data),
    `Instructor with id ${instructor_id} not found`,
  );
};
const deleteInstructorService = async (id: ExpressParamID) => {
  const instructor_id = parseParamID(id);
  return assertFound(
    await repo.delete(instructor_id),
    `Instructor with id ${instructor_id} not found`,
  );
};
const getInstructorCourseService = async (id: ExpressParamID) => {
  const instructor_id = parseParamID(id);
  return assertFound(
    await repo.getCourse(instructor_id),
    `Instructor with id ${instructor_id} not found OR this instructor hasn't registered for any courses`,
  );
};
const getInstructorDepartmentService = async (id: ExpressParamID) => {
  const instructor_id = parseParamID(id);
  return assertFound(
    await repo.getDepartment(instructor_id),
    `Instructor with id ${instructor_id} not found`,
  );
};

export {
  getAllInstructorService,
  createNewInstructorService,
  getSingleInstructorService,
  updateInstructorService,
  deleteInstructorService,
  getInstructorCourseService,
  getInstructorDepartmentService,
};
