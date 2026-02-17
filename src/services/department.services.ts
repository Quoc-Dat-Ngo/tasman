import AppError from "../errors/AppError";
import { assertFound } from "../errors/assertFound";
import { parseParamID } from "../http/parseParamID";
import { PoolDeparmentRepo } from "../repositories/department.repositories";
import type {
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
  ExpressParamID,
} from "../types";

const repo = new PoolDeparmentRepo();

const getAllDepartmentService = () => {
  return repo.getAll();
};
const createNewDepartmentService = (data: CreateDepartmentDTO) => {
  return repo.create(data);
};
const getSingleDepartmentService = (id: ExpressParamID) => {
  const departmentID = parseParamID(id);
  return assertFound(
    repo.getOne(departmentID),
    `Department with id ${departmentID} not found`,
  );
};
const updateDepartmentService = (
  id: ExpressParamID,
  data: UpdateDepartmentDTO,
) => {
  const departmentID = parseParamID(id);
  if (Object.values(data).every((data) => data === undefined)) {
    throw new AppError("No updated input data on every fields", 400);
  }
  return assertFound(
    repo.update(departmentID, data),
    `Department with id ${departmentID} not found`,
  );
};
const deleteDepartmentService = (id: ExpressParamID) => {
  const departmentID = parseParamID(id);
  return assertFound(
    repo.delete(departmentID),
    `Department with id ${departmentID} not found`,
  );
};
const getDepartmentCourseService = (id: ExpressParamID) => {
  const departmentID = parseParamID(id);
  return assertFound(
    repo.getDepartmentCourse(departmentID),
    `Department with id ${departmentID} not found`,
  );
};
const getDepartmentInstructorService = (id: ExpressParamID) => {
  const departmentID = parseParamID(id);
  return assertFound(
    repo.getDepartmentInstructor(departmentID),
    `Department with id ${departmentID} not found`,
  );
};
const getDepartmentMajorService = (id: ExpressParamID) => {
  const departmentID = parseParamID(id);
  return assertFound(
    repo.getDepartmentMajor(departmentID),
    `Department with id ${departmentID} not found`,
  );
};

export {
  getAllDepartmentService,
  createNewDepartmentService,
  getSingleDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
  getDepartmentCourseService,
  getDepartmentInstructorService,
  getDepartmentMajorService,
};
