import express from "express";
import type { Router } from "express";
export const departmentsRouter: Router = express.Router();

import {
  getAllDepartment,
  createNewDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartmentCourse,
  getAllDepartmentInstructor,
  getAllDepartmentMajor,
} from "../controllers/departmentsController";

departmentsRouter.route("/").get(getAllDepartment).post(createNewDepartment);
departmentsRouter
  .route("/:id")
  .get(getSingleDepartment)
  .patch(updateDepartment)
  .delete(deleteDepartment);
departmentsRouter.route("/:id/courses").get(getAllDepartmentCourse);
departmentsRouter.route("/:id/instructors").get(getAllDepartmentInstructor);
departmentsRouter.route("/:id/majors").get(getAllDepartmentMajor);
