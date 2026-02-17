import express from "express";
import type { Router } from "express";
export const departmentsRouter: Router = express.Router();

import {
  getAllDepartmentController,
  createNewDepartmentController,
  getSingleDepartmentController,
  updateDepartmentController,
  deleteDepartmentController,
  getDepartmentCourseController,
  getDepartmentInstructorController,
  getDepartmentMajorController,
} from "../controllers/department.controllers";

departmentsRouter
  .route("/")
  .get(getAllDepartmentController)
  .post(createNewDepartmentController);
departmentsRouter
  .route("/:id")
  .get(getSingleDepartmentController)
  .patch(updateDepartmentController)
  .delete(deleteDepartmentController);
departmentsRouter.route("/:id/courses").get(getDepartmentCourseController);
departmentsRouter
  .route("/:id/instructors")
  .get(getDepartmentInstructorController);
departmentsRouter.route("/:id/majors").get(getDepartmentMajorController);
