export interface Course {
  course_id: number;
  course_title: string;
  course_code: string;
  fee: number;
  department_id: number;
}

export interface CreateCourseDTO {
  course_title: string;
  course_code: string;
  fee: number;
  department_id: number;
}

export interface UpdateCourseDTO {
  course_title?: string;
  course_code?: string;
  fee?: number;
  department_id?: number;
}
