import express from "express";
import type { Router } from "express";
import {
  loginController,
  registerController,
  logoutController,
  refreshTokenController,
} from "./auth.controllers.js";
import { controllerValidator } from "../../middlewares/validator.js";
import { LoginBodySchema, RegisterBodySchema } from "./auth.schema.js";

export const authRouter: Router = express.Router();

authRouter
  .route("/login")
  .post(controllerValidator(LoginBodySchema), loginController);
authRouter
  .route("/register")
  .post(controllerValidator(RegisterBodySchema), registerController);
authRouter.route("/logout").post(logoutController);
authRouter.route("/refresh-token").post(refreshTokenController);
