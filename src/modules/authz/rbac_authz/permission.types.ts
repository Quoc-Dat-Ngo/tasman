type Action = "read" | "create" | "update" | "delete";
type Resource =
  | "student"
  | "instructor"
  | "course"
  | "major"
  | "department"
  | "user"
  | "role"
  | "permission"
  | "enrollment"
  | "studentMajor"
  | "courseInstructor"
  | "rolePermission";
export type PermissionString = `${Action}:${Resource}`;

export type PermissionList = {
  permission_id: number;
  permission: PermissionString[];
};

export interface Permission {
  permission_id: number;
  action: Action;
  resource: Resource;
}

export interface CreatePermissionDTO {
  action: Action;
  resource: Resource;
}
