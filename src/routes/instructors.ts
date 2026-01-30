import express from "express";
import type { Router } from "express";
export const instructorsRouter: Router = express.Router();

import {
  getAllInstructor,
  createNewInstructor,
  getSingleInstructor,
  updateInstructor,
  deleteInstructor,
  getAllInstructorCourse,
  getInstructorDepartment,
} from "../controllers/instructorsController";

instructorsRouter.route("/").get(getAllInstructor).post(createNewInstructor);
instructorsRouter
  .route("/:id")
  .get(getSingleInstructor)
  .patch(updateInstructor)
  .delete(deleteInstructor);
instructorsRouter.route("/:id/majors").get(getAllInstructorCourse);
instructorsRouter.route("/:id/department").get(getInstructorDepartment);
