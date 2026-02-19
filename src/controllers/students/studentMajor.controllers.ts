import type { Request, Response, NextFunction } from "express";
import { controllerHandler } from "../helpers/controllerHandler";
import {
  registerMajorService,
  removeRegisterMajorService,
} from "../../services/students/studentMajor.services";

function registerMajorController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  controllerHandler(() => registerMajorService(req.body), res, next, 201);
}

function removeRegisterMajorController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  controllerHandler(() => removeRegisterMajorService(req.params.id), res, next);
}

export { registerMajorController, removeRegisterMajorController };
