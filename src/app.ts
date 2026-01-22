import express from "express";
import morgan from "morgan";
import { studentsRouter } from "./routes/students";
import { coursesRouter } from "./routes/courses";
import { instructorsRouter } from "./routes/instructors";
import { majorsRouter } from "./routes/majors";
import { departmentsRouter } from "./routes/deparments";

const app = express();

// Sanity check
app.get("/", (req, res) => {
  res.status(200).send("Server is still alive");
});

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routing
app.use("/api/v1/students", studentsRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/instructors", instructorsRouter);
app.use("/api/v1/majors", majorsRouter);
app.use("/api/v1/departments", departmentsRouter);

export default app;
