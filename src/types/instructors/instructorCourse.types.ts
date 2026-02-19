export interface InstructorCourse {
  course_instructor_id: number;
  course_id: number;
  instructor_id: number;
}

export interface CreateInstructorCourseDTO {
  course_id: string;
  instructor_id: string;
}
