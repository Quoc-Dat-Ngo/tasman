export interface Department {
  department_id: number;
  department_name: string;
}

export interface CreateDepartmentDTO {
  department_name: string;
}

export interface UpdateDepartmentDTO {
  department_name?: string;
}
