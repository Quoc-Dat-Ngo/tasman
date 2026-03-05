import express from "express";
import type { Router } from "express";
import { createUserController } from "./admin.controllers";
import { controllerValidator } from "../../middlewares/validator";
import { AdminBodySchema } from "./admin.schema";

export const adminRouter: Router = express.Router();

adminRouter
  .route("/")
  .post(controllerValidator(AdminBodySchema), createUserController);
