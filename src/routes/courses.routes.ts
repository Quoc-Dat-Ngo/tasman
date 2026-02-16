import express from "express";
import type { Router } from "express";
export const coursesRouter: Router = express.Router();

import {
  getAllCourseController,
  createNewCourseController,
  getSingleCourseController,
  updateCourseController,
  deleteCourseController,
  getCourseStudentController,
  getCourseInstructorController,
  getCourseDepartmentController,
} from "../controllers/course.controllers";

coursesRouter
  .route("/")
  .get(getAllCourseController)
  .post(createNewCourseController);
coursesRouter
  .route("/:id")
  .get(getSingleCourseController)
  .patch(updateCourseController)
  .delete(deleteCourseController);
coursesRouter.route("/:id/students").get(getCourseStudentController);
coursesRouter.route("/:id/instructors").get(getCourseInstructorController); // TODO: TEST LATER WHEN IMPLEMENTING INSTRUCTOR
coursesRouter.route("/:id/department").get(getCourseDepartmentController);
