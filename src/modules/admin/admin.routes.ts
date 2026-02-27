import express from "express";
import type { Router } from "express";
import { createUserController } from "./admin.controllers";

export const adminRouter: Router = express.Router();

adminRouter.route("/").post(createUserController);
