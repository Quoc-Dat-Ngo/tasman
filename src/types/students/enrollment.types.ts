export interface Enrollment {
  student_id: number;
  course_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateEnrollmentDTO {
  student_id: string;
  course_id: string;
}
