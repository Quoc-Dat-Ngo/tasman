import { pool } from "../../../pool.js";
import type {
  CreatePermissionDTO,
  Permission,
  PermissionList,
} from "../rbac_authz/permission.types.js";

interface PermissionRepository {
  create(data: CreatePermissionDTO): Promise<Permission>;
  getPermissionList(role_id: number): Promise<PermissionList[]>;
}

export class PoolPermissionRepo implements PermissionRepository {
  async create(data: CreatePermissionDTO): Promise<Permission> {
    return (
      await pool.query<Permission>(
        `
          INSERT INTO permissions (action, resource, created_at, updated_at)
          VALUES ($1, $2, DEFAULT, DEFAULT)
          RETURNING *;
        `,
        [data.action, data.resource],
      )
    ).rows[0]!;
  }
  async getPermissionList(role_id: number): Promise<PermissionList[]> {
    return (
      await pool.query(
        `
          SELECT p.permission_id, p.action || ':' || p.resource AS permission 
          FROM permissions p 
          JOIN role_permissions rp ON rp.permission_id = p.permission_id
          JOIN roles r ON rp.role_id = r.role_id
          WHERE r.role_id = $1;
        `,
        [role_id],
      )
    ).rows;
  }
}
