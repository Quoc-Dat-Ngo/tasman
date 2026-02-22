export interface Course {
  course_id: number;
  course_title: string;
  course_code: string;
  fee: number;
  department_id: number;
  created_at: Date;
  updated_at: Date;
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
