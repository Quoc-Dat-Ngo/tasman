export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
}

export interface CreateStudentDTO {
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
}

export interface UpdateStudentDTO {
  first_name?: string;
  last_name?: string;
  dob?: Date;
  gender?: "M" | "F";
}
