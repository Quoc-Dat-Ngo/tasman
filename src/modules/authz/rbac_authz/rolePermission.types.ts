export interface RolePermission {
  role_id: number;
  permission_id: number;
}

export interface CreateRolePermissionDTO {
  role_id: string;
  permission_id: string;
}
