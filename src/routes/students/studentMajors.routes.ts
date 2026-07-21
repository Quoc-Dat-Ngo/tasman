import { Router } from "express";
import {
  registerMajorController,
  removeRegisterMajorController,
} from "../../controllers/students/studentMajor.controllers.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { authorise } from "../../middlewares/authorise.js";
export const studentMajorsRouter = Router();

studentMajorsRouter.use(authenticate());

studentMajorsRouter
  .route("/")
  .post(authorise("create:studentMajor"), registerMajorController);
studentMajorsRouter
  .route("/:id")
  .delete(authorise("delete:studentMajor"), removeRegisterMajorController);
