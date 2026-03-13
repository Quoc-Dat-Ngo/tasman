export type {
  Student,
  CreateStudentDTO,
  UpdateStudentDTO,
  StudentQueryDTO,
  StudentMetadata,
} from "./students/student.types";
export type {
  Enrollment,
  CreateEnrollmentDTO,
} from "./students/enrollment.types";
export type {
  StudentMajor,
  CreateStudentMajorDTO,
} from "./students/studentMajor.types";

export type {
  Instructor,
  CreateInstructorDTO,
  UpdateInstructorDTO,
} from "./instructors/instructor.types";
export type {
  InstructorCourse,
  CreateInstructorCourseDTO,
} from "./instructors/instructorCourse.types";

export type { Course, CreateCourseDTO, UpdateCourseDTO } from "./course.types";

export type { Major, CreateMajorDTO, UpdateMajorDTO } from "./major.types";

export type {
  Department,
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
} from "./department.types";

export type ExpressParamID = string | string[] | undefined;
export interface BaseQuery {
  limit?: string | undefined;
  offset?: string | undefined;
  sort?: string | undefined;
}
