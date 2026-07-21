import express from "express";
import type { Router } from "express";
import { createNewPermissionController } from "./permission.controllers.js";

export const permissionRouter: Router = express.Router();

permissionRouter.route("/").post(createNewPermissionController);
