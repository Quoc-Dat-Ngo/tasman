import express from "express";
import type { Router } from "express";
export const authRouter: Router = express.Router();

import { loginController, registerController } from "./auth.controllers";

authRouter.route("/login").post(loginController);
authRouter.route("/register").post(registerController);
// authRouter.route("/logout").post();
// authRouter.route("/refresh-token").post();
