import AppError from "../errors/AppError.js";
import { assertFound } from "../errors/assertFound.js";
import { parseParamID } from "../http/parseParamID.js";
import { PoolDeparmentRepo } from "../repositories/department.repositories.js";
import type {
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
  ExpressParamID,
} from "../types/index.types.js";

const repo = new PoolDeparmentRepo();

const getAllDepartmentService = () => {
  return repo.getAll();
};
const createNewDepartmentService = (data: CreateDepartmentDTO) => {
  return repo.create(data);
};
const getSingleDepartmentService = async (id: ExpressParamID) => {
  const departmentID = parseParamID(id);
  return assertFound(
    await repo.getOne(departmentID),
    `Department with id ${departmentID} not found`,
  );
};
const updateDepartmentService = async (
  id: ExpressParamID,
  data: UpdateDepartmentDTO,
) => {
  const departmentID = parseParamID(id);
  if (Object.values(data).every((data) => data === undefined)) {
    throw new AppError("No updated input data on every fields", 400);
  }
  return assertFound(
    await repo.update(departmentID, data),
    `Department with id ${departmentID} not found`,
  );
};
const deleteDepartmentService = async (id: ExpressParamID) => {
  const departmentID = parseParamID(id);
  return assertFound(
    await repo.delete(departmentID),
    `Department with id ${departmentID} not found`,
  );
};
const getDepartmentCourseService = async (id: ExpressParamID) => {
  const departmentID = parseParamID(id);
  return assertFound(
    await repo.getDepartmentCourse(departmentID),
    `Department with id ${departmentID} not found`,
  );
};
const getDepartmentInstructorService = async (id: ExpressParamID) => {
  const departmentID = parseParamID(id);
  return assertFound(
    await repo.getDepartmentInstructor(departmentID),
    `Department with id ${departmentID} not found`,
  );
};
const getDepartmentMajorService = async (id: ExpressParamID) => {
  const departmentID = parseParamID(id);
  return assertFound(
    await repo.getDepartmentMajor(departmentID),
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
