import { Router } from "express";
import { enrollCourseController } from "../controllers/students/enrollment.controllers";
export const enrollmentRouter = Router();

enrollmentRouter.route("/").post(enrollCourseController);
enrollmentRouter.route("/:id").delete(); // TODO
