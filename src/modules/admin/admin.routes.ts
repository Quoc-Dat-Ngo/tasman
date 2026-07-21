import express from "express";
import type { Router } from "express";
import { createUserController } from "./admin.controllers.js";
import { controllerValidator } from "../../middlewares/validator.js";
import { AdminBodySchema } from "./admin.schema.js";

export const adminRouter: Router = express.Router();

adminRouter
  .route("/")
  .post(controllerValidator(AdminBodySchema), createUserController);
