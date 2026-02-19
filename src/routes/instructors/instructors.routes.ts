import express from "express";
import type { Router } from "express";
export const instructorsRouter: Router = express.Router();

import {
  getAllInstructorController,
  createNewInstructorController,
  getSingleInstructorController,
  updateInstructorController,
  deleteInstructorController,
  getInstructorCourseController,
  getInstructorDepartmentController,
} from "../../controllers/instructors/instructor.controllers";

instructorsRouter
  .route("/")
  .get(getAllInstructorController)
  .post(createNewInstructorController);
instructorsRouter
  .route("/:id")
  .get(getSingleInstructorController)
  .patch(updateInstructorController)
  .delete(deleteInstructorController);
instructorsRouter.route("/:id/majors").get(getInstructorCourseController);
instructorsRouter
  .route("/:id/department")
  .get(getInstructorDepartmentController);
