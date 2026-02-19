import { Router } from "express";
import {
  enrollCourseController,
  removeEnrollCourseController,
} from "../../controllers/students/enrollment.controllers";
export const enrollmentRouter = Router();

enrollmentRouter.route("/").post(enrollCourseController);
enrollmentRouter.route("/:id").delete(removeEnrollCourseController);
