import express from "express";
import type { Router } from "express";
import {
  registerCourseController,
  removeRegisterCourseController,
} from "../../controllers/instructors/instructorCourse.controllers.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { authorise } from "../../middlewares/authorise.js";
export const instructorCourseRouter: Router = express.Router();

instructorCourseRouter.use(authenticate());

instructorCourseRouter
  .route("/")
  .post(authorise("create:courseInstructor"), registerCourseController);
instructorCourseRouter
  .route("/:id")
  .delete(authorise("create:courseInstructor"), removeRegisterCourseController);
