import express from "express";
import type { Router } from "express";
import {
  getAllMajorController,
  createNewMajorController,
  getSingleMajorController,
  updateMajorController,
  deleteMajorController,
  getMajorStudentController,
  getMajorDepartmentController,
} from "../controllers/major.controllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorise } from "../middlewares/authorise.js";
export const majorsRouter: Router = express.Router();

majorsRouter.use(authenticate());

majorsRouter
  .route("/")
  .get(authorise("read:major"), getAllMajorController)
  .post(authorise("create:major"), createNewMajorController);
majorsRouter
  .route("/:id")
  .get(authorise("read:major"), getSingleMajorController)
  .patch(authorise("update:major"), updateMajorController)
  .delete(authorise("delete:major"), deleteMajorController);
majorsRouter
  .route("/:id/students")
  .get(authorise("read:student"), getMajorStudentController);
majorsRouter
  .route("/:id/department")
  .get(authorise("read:department"), getMajorDepartmentController);
