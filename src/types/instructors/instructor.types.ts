export interface Instructor {
  instructor_id: number;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
  department_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateInstructorDTO {
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
  department_id: number;
}

export interface UpdateInstructorDTO {
  first_name?: string;
  last_name?: string;
  dob?: Date;
  gender?: "M" | "F";
  department_id?: number;
}
