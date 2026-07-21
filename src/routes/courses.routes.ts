import express from "express";
import type { Router } from "express";
import {
  getAllCourseController,
  createNewCourseController,
  getSingleCourseController,
  updateCourseController,
  deleteCourseController,
  getCourseStudentController,
  getCourseInstructorController,
  getCourseDepartmentController,
} from "../controllers/course.controllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorise } from "../middlewares/authorise.js";
export const coursesRouter: Router = express.Router();

coursesRouter.use(authenticate());

coursesRouter
  .route("/")
  .get(authorise("read:course"), getAllCourseController)
  .post(authorise("create:course"), createNewCourseController);
coursesRouter
  .route("/:id")
  .get(authorise("read:course"), getSingleCourseController)
  .patch(authorise("update:course"), updateCourseController)
  .delete(authorise("delete:course"), deleteCourseController);
coursesRouter
  .route("/:id/students")
  .get(authorise("read:student"), getCourseStudentController);
coursesRouter
  .route("/:id/instructors")
  .get(authorise("read:instructor"), getCourseInstructorController);
coursesRouter
  .route("/:id/department")
  .get(authorise("read:department"), getCourseDepartmentController);
