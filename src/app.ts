import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/errorHandler.js";

// JWT Authentication router
import { authRouter } from "./modules/auth/auth.routes.js";

// RBAC Authorisation router
import { roleRouter } from "./modules/authz/roles/role.routes.js";

import { studentsRouter } from "./routes/students/students.routes.js";
import { enrollmentRouter } from "./routes/students/enrollments.routes.js";
import { studentMajorsRouter } from "./routes/students/studentMajors.routes.js";

import { instructorsRouter } from "./routes/instructors/instructors.routes.js";
import { instructorCourseRouter } from "./routes/instructors/instructorCourse.routes.js";

import { coursesRouter } from "./routes/courses.routes.js";
import { majorsRouter } from "./routes/majors.routes.js";
import { departmentsRouter } from "./routes/departments.routes.js";
import { permissionRouter } from "./modules/authz/permissions/permission.routes.js";
import { rolePermissionRouter } from "./modules/authz/role_permissons/rolePermission.routes.js";
import { adminRouter } from "./modules/admin/admin.routes.js";

const app = express();

// Middleware to parse cookie request
app.use(cookieParser());

// For connecting with a frontend (if we end up having one :)
app.use(
  cors({
    origin: "http://localhost:3030",
    credentials: true,
  }),
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// For URL-encoded body (possibly query for filter/search/sort)
app.use(express.urlencoded({ extended: true }));

// Sanity check
app.get("/", (req, res) => {
  res.status(200).send("Server is still alive");
});

// Authentication routes
app.use("/api/v1/auth", authRouter);

// Roles, permissions routes
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/permissions", permissionRouter);
app.use("/api/v1/role-permissions", rolePermissionRouter);

// Admin-level administration
app.use("/api/v1/admin", adminRouter);

// Student-related routes
app.use("/api/v1/students", studentsRouter);
app.use("/api/v1/enrollments", enrollmentRouter);
app.use("/api/v1/student-majors", studentMajorsRouter);

// Course-related routes
app.use("/api/v1/courses", coursesRouter);

// Instructor-related routes
app.use("/api/v1/instructors", instructorsRouter);
app.use("/api/v1/instructor-courses", instructorCourseRouter);

// Major-related routes
app.use("/api/v1/majors", majorsRouter);

// Department routes
app.use("/api/v1/departments", departmentsRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
