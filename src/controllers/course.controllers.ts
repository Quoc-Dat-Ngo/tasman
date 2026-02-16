import type { Request, Response, NextFunction } from "express";
import type { Course } from "../types";

import {
  getAllCourseService,
  getSingleCourseService,
  createNewCourseService,
  updateCourseService,
  deleteCourseService,
  getCourseStudentService,
  getCourseInstructorService,
  getCourseDepartmentService,
} from "../services/course.services";
import { controllerHandler } from "./helpers/controllerHandler";

const getAllCourseController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getAllCourseService(req.query), res, next);
};
const createNewCourseController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => createNewCourseService(req.body), res, next, 201);
};
const getSingleCourseController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getSingleCourseService(req.params.id), res, next);
};
const updateCourseController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(
    () => updateCourseService(req.params.id, req.body),
    res,
    next,
  );
};
const deleteCourseController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => deleteCourseService(req.params.id), res, next);
};
const getCourseStudentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getCourseStudentService(req.params.id), res, next);
};
const getCourseInstructorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getCourseInstructorService(req.params.id), res, next);
};
const getCourseDepartmentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getCourseDepartmentService(req.params.id), res, next);
};

export {
  getAllCourseController,
  createNewCourseController,
  getSingleCourseController,
  updateCourseController,
  deleteCourseController,
  getCourseStudentController,
  getCourseInstructorController,
  getCourseDepartmentController,
};
