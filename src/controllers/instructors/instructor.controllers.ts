import type { Response, Request, NextFunction } from "express";

import {
  getAllInstructorService,
  getSingleInstructorService,
  createNewInstructorService,
  updateInstructorService,
  deleteInstructorService,
  getInstructorCourseService,
  getInstructorDepartmentService,
} from "../../services/instructors/instructor.services";
import { controllerHandler } from "../helpers/controllerHandler";

const getAllInstructorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getAllInstructorService(req.query), res, next);
};
const createNewInstructorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => createNewInstructorService(req.body), res, next, 201);
};
const getSingleInstructorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getSingleInstructorService(req.params.id), res, next);
};
const updateInstructorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(
    () => updateInstructorService(req.params.id, req.body),
    res,
    next,
  );
};
const deleteInstructorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => deleteInstructorService(req.params.id), res, next);
};
const getInstructorCourseController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getInstructorCourseService(req.params.id), res, next);
};
const getInstructorDepartmentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(
    () => getInstructorDepartmentService(req.params.id),
    res,
    next,
  );
};

export {
  getAllInstructorController,
  createNewInstructorController,
  getSingleInstructorController,
  updateInstructorController,
  deleteInstructorController,
  getInstructorCourseController,
  getInstructorDepartmentController,
};
