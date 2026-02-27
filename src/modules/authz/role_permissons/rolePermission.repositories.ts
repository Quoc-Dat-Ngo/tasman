import { pool } from "../../../pool";
import type {
  CreateRolePermissionDTO,
  RolePermission,
} from "../rbac_authz/rolePermission.types";

interface RolePermissionRepository {
  create(data: CreateRolePermissionDTO): Promise<RolePermission>;
}

export class PoolRolePermission implements RolePermissionRepository {
  async create(data: CreateRolePermissionDTO): Promise<RolePermission> {
    return (
      await pool.query<RolePermission>(
        `
        INSERT INTO role_permissions (role_id, permission_id, created_at, updated_at) 
        VALUES ($1, $2, DEFAULT, DEFAULT)
        RETURNING *;
      `,
        [data.role_id, data.permission_id],
      )
    ).rows[0]!;
  }
}
