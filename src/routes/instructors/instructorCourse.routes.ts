import express from "express";
import type { Router } from "express";
import {
  registerCourseController,
  removeRegisterCourseController,
} from "../../controllers/instructors/instructorCourse.controllers";
import { authenticate } from "../../middlewares/authenticate";
import { authorise } from "../../middlewares/authorise";
export const instructorCourseRouter: Router = express.Router();

instructorCourseRouter.use(authenticate());

instructorCourseRouter
  .route("/")
  .post(authorise("create:courseInstructor"), registerCourseController);
instructorCourseRouter
  .route("/:id")
  .delete(authorise("create:courseInstructor"), removeRegisterCourseController);
