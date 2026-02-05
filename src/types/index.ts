export type {
  Student,
  CreateStudentDTO,
  UpdateStudentDTO,
  FilteringByStudent,
  GetStudentMetadata,
} from "./student";
export type { Course, CreateCourseDTO, UpdateCourseDTO } from "./course";
export type {
  Department,
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
} from "./department";
export type { Major, CreateMajorDTO, UpdateMajorDTO } from "./major";
export type { Enrollment } from "./enrollments";
export type { StudentMajor } from "./studentMajor";
export type { Instructor, CreateInstructorDTO } from "./instructor";
export type IDType = string | string[] | undefined;
export interface PaginationQuery {
  limit?: string;
  offset?: string;
  sort?: string;
}
