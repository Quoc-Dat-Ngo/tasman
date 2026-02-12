import express from "express";
import type { Router } from "express";
export const studentsRouter: Router = express.Router();

import {
  getAllStudentController,
  getSingleStudentController,
  createNewStudentController,
  updateStudentController,
  deleteStudentController,
  getStudentCourseController,
  getStudentMajorController,
} from "../controllers/students/student.controllers";

studentsRouter
  .route("/")
  .get(getAllStudentController)
  .post(createNewStudentController);

studentsRouter
  .route("/:id")
  .get(getSingleStudentController)
  .patch(updateStudentController)
  .delete(deleteStudentController);

studentsRouter.route("/:id/courses").get(getStudentCourseController);
studentsRouter.route("/:id/majors").get(getStudentMajorController);
