import type { Request, Response, NextFunction } from "express";
import { controllerHandler } from "../helpers/controllerHandler";
import { registerMajorService } from "../../services/students/studentMajor.services";

function registerMajorController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  controllerHandler(
    () => registerMajorService(req.params.id, req.body),
    res,
    next,
    201,
  );
}

export { registerMajorController };
