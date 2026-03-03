import express from "express";
import type { Router } from "express";
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
import { authenticate } from "../middlewares/authenticate";
import { authorise } from "../middlewares/authorise";
export const departmentsRouter: Router = express.Router();

departmentsRouter.use(authenticate());

departmentsRouter
  .route("/")
  .get(authorise("read:department"), getAllDepartmentController)
  .post(authorise("create:department"), createNewDepartmentController);
departmentsRouter
  .route("/:id")
  .get(authorise("read:department"), getSingleDepartmentController)
  .patch(authorise("read:department"), updateDepartmentController)
  .delete(authorise("read:department"), deleteDepartmentController);
departmentsRouter
  .route("/:id/courses")
  .get(authorise("read:department"), getDepartmentCourseController);
departmentsRouter
  .route("/:id/instructors")
  .get(authorise("read:department"), getDepartmentInstructorController);
departmentsRouter
  .route("/:id/majors")
  .get(authorise("read:department"), getDepartmentMajorController);
