import type { Request, Response, NextFunction } from "express";
import type { Department, Major, Student } from "../types";
import {
  getAllMajorService,
  getSingleMajorService,
  createNewMajorService,
  updateMajorService,
  deleteMajorService,
  getMajorStudentService,
  getMajorDepartmentService,
} from "../services/major.services";
import { controllerHandler } from "./helpers/controllerHandler";

const getAllMajorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getAllMajorService(req.query), res, next);
};
const createNewMajorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => createNewMajorService(req.body), res, next, 201);
};
const getSingleMajorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getSingleMajorService(req.params.id), res, next);
};
const updateMajorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(
    () => updateMajorService(req.params.id, req.body),
    res,
    next,
  );
};
const deleteMajorController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => deleteMajorService(req.params.id), res, next);
};
const getMajorStudentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getMajorStudentService(req.params.id), res, next);
};
const getMajorDepartmentController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => getMajorDepartmentService(req.params.id), res, next);
};

export {
  getAllMajorController,
  createNewMajorController,
  getSingleMajorController,
  updateMajorController,
  deleteMajorController,
  getMajorStudentController,
  getMajorDepartmentController,
};
