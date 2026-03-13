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
} from "../../controllers/students/student.controllers";
import { authenticate } from "../../middlewares/authenticate";
import { authorise } from "../../middlewares/authorise";
import { controllerValidator } from "../../middlewares/validator";
import {
  CreateStudentSchema,
  StudentQuerySchema,
  UpdateStudentSchema,
} from "../../schema/student.schemas";
import { ParamsSchema } from "../../schema/common.schemas";

export const studentsRouter: Router = express.Router();

studentsRouter.use(authenticate());

studentsRouter
  .route("/")
  .get(
    authorise("read:student"),
    controllerValidator(StudentQuerySchema),
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
    controllerValidator(ParamsSchema),
    getSingleStudentController,
  )
  .patch(
    authorise("update:student"),
    controllerValidator(UpdateStudentSchema, ParamsSchema),
    updateStudentController,
  )
  .delete(
    authorise("delete:student"),
    controllerValidator(ParamsSchema),
    deleteStudentController,
  );

studentsRouter
  .route("/:id/courses")
  .get(
    authorise("read:course"),
    controllerValidator(ParamsSchema),
    getStudentCourseController,
  );
studentsRouter
  .route("/:id/majors")
  .get(
    authorise("read:major"),
    controllerValidator(ParamsSchema),
    getStudentMajorController,
  );
