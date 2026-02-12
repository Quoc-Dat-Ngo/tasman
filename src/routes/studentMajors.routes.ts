import { Router } from "express";
import { registerMajor } from "../controllers/students/student.controllers";
export const studentMajorsRouter = Router();

studentMajorsRouter.route("/").post(registerMajor);
studentMajorsRouter.route("/:id").delete(); //TODO
