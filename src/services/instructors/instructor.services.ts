import AppError from "../../errors/AppError";
import { assertFound } from "../../errors/assertFound";
import { parseParamID } from "../../http/parseParamID";
import { PoolInstructorRepo } from "../../repositories/instructors/instructor.repositories";
import type {
  BaseQuery,
  CreateInstructorDTO,
  ExpressParamID,
  UpdateInstructorDTO,
} from "../../types/index.types";

const repo = new PoolInstructorRepo();

const getAllInstructorService = (query: BaseQuery) => {
  return repo.getAll(query);
};
const createNewInstructorService = (data: CreateInstructorDTO) => {
  return repo.create(data);
};
const getSingleInstructorService = (id: ExpressParamID) => {
  const instructor_id = parseParamID(id);
  return assertFound(
    repo.getOne(instructor_id),
    `Instructor with id ${instructor_id} not found`,
  );
};
const updateInstructorService = (
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
    repo.update(instructor_id, data),
    `Instructor with id ${instructor_id} not found`,
  );
};
const deleteInstructorService = (id: ExpressParamID) => {
  const instructor_id = parseParamID(id);
  return assertFound(
    repo.delete(instructor_id),
    `Instructor with id ${instructor_id} not found`,
  );
};
const getInstructorCourseService = (id: ExpressParamID) => {
  const instructor_id = parseParamID(id);
  return assertFound(
    repo.getCourse(instructor_id),
    `Instructor with id ${instructor_id} not found OR this instructor hasn't registered for any courses`,
  );
};
const getInstructorDepartmentService = (id: ExpressParamID) => {
  const instructor_id = parseParamID(id);
  return assertFound(
    repo.getDepartment(instructor_id),
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
