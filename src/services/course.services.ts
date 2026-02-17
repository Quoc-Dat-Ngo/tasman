import AppError from "../errors/AppError";
import { assertFound } from "../errors/assertFound";
import { parseParamID } from "../http/parseParamID";
import { PoolCourseRepo } from "../repositories/course.repositories";
import type {
  CreateCourseDTO,
  BaseQuery,
  UpdateCourseDTO,
  ExpressParamID,
} from "../types";

const repo = new PoolCourseRepo();

const getAllCourseService = async (query: BaseQuery) => {
  return repo.getAll(query);
};
const createNewCourseService = async (data: CreateCourseDTO) => {
  return repo.create(data);
};
const getSingleCourseService = async (id: ExpressParamID) => {
  const course_id = parseParamID(id);
  return assertFound(
    repo.getOne(course_id),
    `Course with id ${course_id} not found`,
  );
};
const updateCourseService = async (
  id: ExpressParamID,
  data: UpdateCourseDTO,
) => {
  const course_id = parseParamID(id);

  if (Object.values(data).every((v) => v === undefined)) {
    throw new AppError("No fields provided for updating", 400);
  }

  return assertFound(
    repo.update(course_id, data),
    `Course with id ${course_id} not found`,
  );
};
const deleteCourseService = async (id: ExpressParamID) => {
  const course_id = parseParamID(id);
  return assertFound(
    repo.delete(course_id),
    `Course with id ${course_id} not found`,
  );
};
const getCourseStudentService = async (id: ExpressParamID) => {
  const course_id = parseParamID(id);
  return assertFound(
    repo.getStudent(course_id),
    `Course with id ${course_id} not found OR no students have applied for this course yet`,
  );
};
const getCourseInstructorService = async (id: ExpressParamID) => {
  const course_id = parseParamID(id);
  return assertFound(
    repo.getInstructor(course_id),
    `Course with id ${course_id} not found OR no instructors/tutors have applied for this course yet`,
  );
};
const getCourseDepartmentService = async (id: ExpressParamID) => {
  const course_id = parseParamID(id);
  return assertFound(
    repo.getDepartment(course_id),
    `Course with id ${course_id} not found`,
  );
};

export {
  getAllCourseService,
  createNewCourseService,
  getSingleCourseService,
  updateCourseService,
  deleteCourseService,
  getCourseStudentService,
  getCourseInstructorService,
  getCourseDepartmentService,
};
