import type { PaginationQuery } from ".";

export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
}

export interface GetStudentMetadata {
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
  first_name?: string;
  last_name?: string;
  dob?: Date;
  gender?: "M" | "F";
}

export interface FilteringByStudent extends PaginationQuery {
  first_name?: string;
  last_name?: string;
  dob?: string;
  gender?: string;
}
