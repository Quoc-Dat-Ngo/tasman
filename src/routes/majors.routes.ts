import express from "express";
import type { Router } from "express";
export const majorsRouter: Router = express.Router();

import {
  getAllMajor,
  createNewMajor,
  getSingleMajor,
  updateMajor,
  deleteMajor,
  getAllMajorStudent,
  getMajorDepartment,
} from "../controllers/majorsController";

majorsRouter.route("/").get(getAllMajor).post(createNewMajor);
majorsRouter
  .route("/:id")
  .get(getSingleMajor)
  .patch(updateMajor)
  .delete(deleteMajor);
majorsRouter.route("/:id/students").get(getAllMajorStudent);
majorsRouter.route("/:id/department").get(getMajorDepartment);
