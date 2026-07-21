import type { BaseQuery } from "../index.types.js";

export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
  created_at: Date;
  updated_at: Date;
}

export interface StudentMetadata {
  data: Student[];
  metadata: {
    total_page: number;
    limit: string | number;
    offset: string | number;
  };
}

export interface CreateStudentDTO {
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
}

export interface UpdateStudentDTO {
  first_name?: string | undefined;
  last_name?: string | undefined;
  dob?: Date | undefined;
  gender?: "M" | "F" | undefined;
}

export interface StudentQueryDTO extends BaseQuery {
  first_name?: string | undefined;
  last_name?: string | undefined;
  dob?: string | undefined;
  gender?: string | undefined;
}
