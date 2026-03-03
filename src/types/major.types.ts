export interface Major {
  major_id: number;
  major_name: string;
  department_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateMajorDTO {
  major_name: string;
  department_id: number;
}

export interface UpdateMajorDTO {
  major_name?: string;
  department_id?: number;
}
