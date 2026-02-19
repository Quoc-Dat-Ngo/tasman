export interface StudentMajor {
  student_major_id: number;
  student_id: number;
  major_id: number;
}

export interface CreateStudentMajorDTO {
  student_id: string;
  major_id: string;
}
