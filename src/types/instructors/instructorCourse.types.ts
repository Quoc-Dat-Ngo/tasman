export interface InstructorCourse {
  course_id: number;
  instructor_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateInstructorCourseDTO {
  course_id: string;
  instructor_id: string;
}
