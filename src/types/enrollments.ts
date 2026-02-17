export interface Enrollment {
  enrollment_id: number;
  student_id: number;
  course_id: number;
}

export interface CreateEnrollmentDTO {
  course_id: string;
}
