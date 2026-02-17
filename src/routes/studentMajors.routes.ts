import { Router } from "express";
import {
  registerMajorController,
  removeRegisterMajorController,
} from "../controllers/students/studentMajor.controllers";
export const studentMajorsRouter = Router();

studentMajorsRouter.route("/").post(registerMajorController);
studentMajorsRouter.route("/:id").delete(removeRegisterMajorController);
