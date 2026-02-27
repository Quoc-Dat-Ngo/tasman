export interface User {
  user_id: number;
  user_email: string;
  user_password: string;
  role_id: number;
  linked_student_id: number | null;
  linked_instructor_id: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDTO {
  user_email: string;
  user_password: string;
  role_id: number;
  linked_student_id: number | null;
  linked_instructor_id: number | null;
}
