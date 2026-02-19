export interface Enrollment {
  enrollment_id: number;
  student_id: number;
  course_id: number;
}

export interface CreateEnrollmentDTO {
  student_id: string;
  course_id: string;
}
