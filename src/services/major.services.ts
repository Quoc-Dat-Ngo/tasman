import type {
  Major,
  CreateMajorDTO,
  UpdateMajorDTO,
  BaseQuery,
  ExpressParamID,
} from "../types";
import AppError from "../errors/AppError";
import { PoolMajorRepo } from "../repositories/major.repositories";
import { parseParamID } from "../http/parseParamID";
import { assertFound } from "../errors/assertFound";

const repo = new PoolMajorRepo();

const getAllMajorService = (query: BaseQuery) => {
  return repo.getAll(query);
};
const createNewMajorService = (data: CreateMajorDTO) => {
  return repo.create(data);
};
const getSingleMajorService = (id: ExpressParamID) => {
  const majorID = parseParamID(id);
  return assertFound(
    repo.getOne(majorID),
    `Major with id ${majorID} not found`,
  );
};
const updateMajorService = (id: ExpressParamID, data: UpdateMajorDTO) => {
  const majorID = parseParamID(id);

  if (Object.values(data).every((v) => v === undefined)) {
    throw new AppError("No fields provided for updating", 400);
  }
  return assertFound(
    repo.update(majorID, data),
    `Major with id ${majorID} not found`,
  );
};
const deleteMajorService = (id: ExpressParamID) => {
  const majorID = parseParamID(id);
  return assertFound(
    repo.delete(majorID),
    `Major with id ${majorID} not found`,
  );
};
const getMajorStudentService = (id: ExpressParamID) => {
  const majorID = parseParamID(id);
  return assertFound(
    repo.getStudent(majorID),
    `Major with id ${majorID} not found OR no students have registered for this major`,
  );
};
const getMajorDepartmentService = (id: ExpressParamID) => {
  const majorID = parseParamID(id);
  return assertFound(
    repo.getDepartment(majorID),
    `Major with id ${majorID} not found`,
  );
};

export {
  getAllMajorService,
  createNewMajorService,
  getSingleMajorService,
  updateMajorService,
  deleteMajorService,
  getMajorStudentService,
  getMajorDepartmentService,
};
