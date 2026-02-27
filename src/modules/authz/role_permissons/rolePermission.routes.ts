import express from "express";
import type { Router } from "express";
import { createRolePermissionController } from "./rolePermission.controllers";

export const rolePermissionRouter: Router = express.Router();

rolePermissionRouter.route("/").post(createRolePermissionController);
