import express from "express";
import type { Router } from "express";
import {
  getAllStudentController,
  getSingleStudentController,
  createNewStudentController,
  updateStudentController,
  deleteStudentController,
  getStudentCourseController,
  getStudentMajorController,
} from "../../controllers/students/student.controllers.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { authorise } from "../../middlewares/authorise.js";
import { controllerValidator } from "../../middlewares/validator.js";
import {
  CreateStudentSchema,
  StudentQuerySchema,
  UpdateStudentSchema,
} from "../../schema/student.schemas.js";
import { ParamsSchema } from "../../schema/common.schemas.js";

export const studentsRouter: Router = express.Router();

studentsRouter.use(authenticate());

studentsRouter
  .route("/")
  .get(
    authorise("read:student"),
    controllerValidator(undefined, undefined, StudentQuerySchema),
    getAllStudentController,
  )
  .post(
    authorise("create:student"),
    controllerValidator(CreateStudentSchema),
    createNewStudentController,
  );

studentsRouter
  .route("/:id")
  .get(
    authorise("read:student"),
    controllerValidator(undefined, ParamsSchema),
    getSingleStudentController,
  )
  .patch(
    authorise("update:student"),
    controllerValidator(UpdateStudentSchema, ParamsSchema),
    updateStudentController,
  )
  .delete(
    authorise("delete:student"),
    controllerValidator(undefined, ParamsSchema),
    deleteStudentController,
  );

studentsRouter
  .route("/:id/courses")
  .get(
    authorise("read:course"),
    controllerValidator(undefined, ParamsSchema),
    getStudentCourseController,
  );
studentsRouter
  .route("/:id/majors")
  .get(
    authorise("read:major"),
    controllerValidator(undefined, ParamsSchema),
    getStudentMajorController,
  );
