import { Router } from "express";
import { enrollCourse } from "../controllers/students/student.controllers";
export const enrollmentRouter = Router();

enrollmentRouter.route("/").post(enrollCourse);
enrollmentRouter.route("/:id").delete(); // TODO
