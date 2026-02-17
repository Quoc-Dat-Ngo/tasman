import type { Request, Response, NextFunction } from "express";
import { controllerHandler } from "../helpers/controllerHandler";
import { enrollCourseService } from "../../services/students/enrollment.services";

function enrollCourseController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  controllerHandler(
    () => enrollCourseService(req.params.id, req.body),
    res,
    next,
    201,
  );
}

export { enrollCourseController };
