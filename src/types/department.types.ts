export interface Department {
  department_id: number;
  department_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateDepartmentDTO {
  department_name: string;
}

export interface UpdateDepartmentDTO {
  department_name?: string;
}
