import express from "express";
import type { Router } from "express";
import {
  getAllStudentController,
  getSingleStudentController,
  createNewStudentController,
  updateStudentController,
  deleteStudentController,
  getStudentCourseController,
  getStudentMajorController,
} from "../../controllers/students/student.controllers";
import { authenticate } from "../../middlewares/authenticate";
import { authorise } from "../../middlewares/authorise";

export const studentsRouter: Router = express.Router();

studentsRouter.use(authenticate());

studentsRouter
  .route("/")
  .get(authorise("read:student"), getAllStudentController)
  .post(authorise("create:student"), createNewStudentController);

studentsRouter
  .route("/:id")
  .get(authorise("read:student"), getSingleStudentController)
  .patch(authorise("update:student"), updateStudentController)
  .delete(authorise("delete:student"), deleteStudentController);

studentsRouter
  .route("/:id/courses")
  .get(authorise("read:course"), getStudentCourseController);
studentsRouter
  .route("/:id/majors")
  .get(authorise("read:major"), getStudentMajorController);
