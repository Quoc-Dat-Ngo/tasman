import express from "express";
import morgan from "morgan";
import { studentsRouter } from "./routes/students.routes";
import { coursesRouter } from "./routes/courses.routes";
import { instructorsRouter } from "./routes/instructors.routes";
import { majorsRouter } from "./routes/majors.routes";
import { departmentsRouter } from "./routes/deparments.routes";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { enrollmentRouter } from "./routes/enrollments.routes";
import { studentMajorsRouter } from "./routes/studentMajors.routes";

const app = express();

// Sanity check
app.get("/", (req, res) => {
  res.status(200).send("Server is still alive");
});

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Student-related routing
app.use("/api/v1/students", studentsRouter);
app.use("api/v1/enrollments", enrollmentRouter);
app.use("api/v1/student-majors", studentMajorsRouter);

// Course-related routing
app.use("/api/v1/courses", coursesRouter);

// Instructor-related routing
app.use("/api/v1/instructors", instructorsRouter);

// Major-related routing
app.use("/api/v1/majors", majorsRouter);

// Department routing
app.use("/api/v1/departments", departmentsRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
