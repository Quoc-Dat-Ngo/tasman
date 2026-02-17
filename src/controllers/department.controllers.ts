import type { Request, Response, NextFunction } from "express";
import {
  getAllDepartmentService,
  getSingleDepartmentService,
  createNewDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
  getDepartmentCourseService,
  getDepartmentInstructorService,
  getDepartmentMajorService,
} from "../services/department.services";
import { controllerHandler } from "./helpers/controllerHandler";

const getAllDepartmentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getAllDepartmentService(), res, next);
};
const createNewDepartmentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => createNewDepartmentService(req.body), res, next, 201);
};
const getSingleDepartmentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getSingleDepartmentService(req.params.id), res, next);
};
const updateDepartmentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(
    () => updateDepartmentService(req.params.id, req.body),
    res,
    next,
  );
};
const deleteDepartmentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => deleteDepartmentService(req.params.id), res, next);
};
const getDepartmentCourseController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getDepartmentCourseService(req.params.id), res, next);
};
const getDepartmentInstructorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(
    () => getDepartmentInstructorService(req.params.id),
    res,
    next,
  );
};
const getDepartmentMajorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getDepartmentMajorService(req.params.id), res, next);
};

export {
  getAllDepartmentController,
  createNewDepartmentController,
  getSingleDepartmentController,
  updateDepartmentController,
  deleteDepartmentController,
  getDepartmentCourseController,
  getDepartmentInstructorController,
  getDepartmentMajorController,
};
