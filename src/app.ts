import express from "express";
import morgan from "morgan";
import { globalErrorHandler } from "./middlewares/errorHandler";

// JWT Authentication router
import { authRouter } from "./modules/auth/auth.routes";

// RBAC Authorisation router
import { roleRouter } from "./modules/authz/roles/role.routes";

import { studentsRouter } from "./routes/students/students.routes";
import { enrollmentRouter } from "./routes/students/enrollments.routes";
import { studentMajorsRouter } from "./routes/students/studentMajors.routes";

import { instructorsRouter } from "./routes/instructors/instructors.routes";
import { instructorCourseRouter } from "./routes/instructors/instructorCourse.routes";

import { coursesRouter } from "./routes/courses.routes";
import { majorsRouter } from "./routes/majors.routes";
import { departmentsRouter } from "./routes/deparments.routes";
import { permissionRouter } from "./modules/authz/permissions/permission.routes";
import { rolePermissionRouter } from "./modules/authz/role_permissons/rolePermission.routes";
import { adminRouter } from "./modules/admin/admin.routes";

const app = express();

// Sanity check
app.get("/", (req, res) => {
  res.status(200).send("Server is still alive");
});

// Middleware
app.use(express.json());
app.use(morgan("dev"));

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
