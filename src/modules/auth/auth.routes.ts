import express from "express";
import type { Router } from "express";
export const authRouter: Router = express.Router();

import { loginController, registerController } from "./auth.controllers";
import { controllerValidator } from "../../middlewares/validator";
import { LoginBodySchema, RegisterBodySchema } from "./auth.schema";

authRouter
  .route("/login")
  .post(controllerValidator(LoginBodySchema), loginController);
authRouter
  .route("/register")
  .post(controllerValidator(RegisterBodySchema), registerController);
// authRouter.route("/logout").post();
// authRouter.route("/refresh-token").post();
