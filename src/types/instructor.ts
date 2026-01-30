export interface Instructor {
  instructor_id: number;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
  department_id: number;
}

export interface CreateInstructorDTO {
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
  department_id: number;
}
