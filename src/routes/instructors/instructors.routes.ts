import express from "express";
import type { Router } from "express";
import {
  getAllInstructorController,
  createNewInstructorController,
  getSingleInstructorController,
  updateInstructorController,
  deleteInstructorController,
  getInstructorCourseController,
  getInstructorDepartmentController,
} from "../../controllers/instructors/instructor.controllers.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { authorise } from "../../middlewares/authorise.js";

export const instructorsRouter: Router = express.Router();

instructorsRouter.use(authenticate());

instructorsRouter
  .route("/")
  .get(authorise("read:instructor"), getAllInstructorController)
  .post(authorise("create:instructor"), createNewInstructorController);
instructorsRouter
  .route("/:id")
  .get(authorise("read:instructor"), getSingleInstructorController)
  .patch(authorise("update:instructor"), updateInstructorController)
  .delete(authorise("delete:instructor"), deleteInstructorController);
instructorsRouter
  .route("/:id/courses")
  .get(authorise("read:course"), getInstructorCourseController);
instructorsRouter
  .route("/:id/department")
  .get(authorise("read:department"), getInstructorDepartmentController);
