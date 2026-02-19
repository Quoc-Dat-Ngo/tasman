import type { Response, Request, NextFunction } from "express";
import { controllerHandler } from "../helpers/controllerHandler";
import {
  registerCourseService,
  removeRegisterCourseService,
} from "../../services/instructors/instructorCourse.services";

const registerCourseController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(() => registerCourseService(req.body), res, next, 201);
};
const removeRegisterCourseController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  controllerHandler(
    () => removeRegisterCourseService(req.params.id),
    res,
    next,
  );
};

export { registerCourseController, removeRegisterCourseController };
