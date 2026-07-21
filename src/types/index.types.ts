export type {
  Student,
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentQueryDTO,
  StudentMetadata,
} from "./students/student.types.js";
export type {
  Enrollment,
  CreateEnrollmentDTO,
} from "./students/enrollment.types.js";
export type {
  StudentMajor,
  CreateStudentMajorDTO,
} from "./students/studentMajor.types.js";

export type {
  Instructor,
  CreateInstructorDTO,
  UpdateInstructorDTO,
} from "./instructors/instructor.types.js";
export type {
  InstructorCourse,
  CreateInstructorCourseDTO,
} from "./instructors/instructorCourse.types.js";

export type { Course, CreateCourseDTO, UpdateCourseDTO } from "./course.types.js";

export type { Major, CreateMajorDTO, UpdateMajorDTO } from "./major.types.js";

export type {
  Department,
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
} from "./department.types.js";

export type ExpressParamID = string | string[] | undefined;
export interface BaseQuery {
  limit?: string | undefined;
  offset?: string | undefined;
  sort?: string | undefined;
}
