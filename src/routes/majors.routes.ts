import express from "express";
import type { Router } from "express";
export const majorsRouter: Router = express.Router();

import {
  getAllMajorController,
  createNewMajorController,
  getSingleMajorController,
  updateMajorController,
  deleteMajorController,
  getMajorStudentController,
  getMajorDepartmentController,
} from "../controllers/major.controllers";

majorsRouter
  .route("/")
  .get(getAllMajorController)
  .post(createNewMajorController);
majorsRouter
  .route("/:id")
  .get(getSingleMajorController)
  .patch(updateMajorController)
  .delete(deleteMajorController);
majorsRouter.route("/:id/students").get(getMajorStudentController);
majorsRouter.route("/:id/department").get(getMajorDepartmentController);
