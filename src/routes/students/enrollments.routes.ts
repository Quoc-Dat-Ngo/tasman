import { Router } from "express";
import {
  enrollCourseController,
  removeEnrollCourseController,
} from "../../controllers/students/enrollment.controllers.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { authorise } from "../../middlewares/authorise.js";
export const enrollmentRouter = Router();

enrollmentRouter.use(authenticate());

enrollmentRouter
  .route("/")
  .post(authorise("create:enrollment"), enrollCourseController);
enrollmentRouter
  .route("/:id")
  .delete(authorise("delete:enrollment"), removeEnrollCourseController);
