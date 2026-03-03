export interface StudentMajor {
  student_id: number;
  major_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateStudentMajorDTO {
  student_id: string;
  major_id: string;
}
