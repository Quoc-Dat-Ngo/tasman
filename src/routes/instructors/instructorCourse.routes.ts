import express from "express";
import type { Router } from "express";
import {
  registerCourseController,
  removeRegisterCourseController,
} from "../../controllers/instructors/instructorCourse.controllers";
export const instructorCourseRouter: Router = express.Router();

instructorCourseRouter.route("/").post(registerCourseController);
instructorCourseRouter.route("/:id").delete(removeRegisterCourseController);
