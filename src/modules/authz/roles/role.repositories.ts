import { pool } from "../../../pool";
import type { Role } from "../rbac_authz/role.types";

interface RoleRepository {
  create(name: string): Promise<Role>;
  getRoleName(role_id: number): Promise<Role | null>;
}

export class PoolRoleRepo implements RoleRepository {
  async create(name: string): Promise<Role> {
    return (
      await pool.query<Role>(
        `
          INSERT INTO roles (role_name, created_at, updated_at)
          VALUES ($1, DEFAULT, DEFAULT)
          RETURNING *;
        `,
        [name],
      )
    ).rows[0]!;
  }

  async getRoleName(role_id: number): Promise<Role | null> {
    return (
      (
        await pool.query<Role>(
          `
          SELECT *
          FROM roles
          WHERE role_id = $1;
        `,
          [role_id],
        )
      ).rows[0] ?? null
    );
  }
}
