import express from "express";
import type { Router } from "express";
import { createNewRoleController } from "./role.controllers";
export const roleRouter: Router = express.Router();

roleRouter.route("/").post(createNewRoleController);
// .get;
// roleRouter.route('/:id').patch().delete()
