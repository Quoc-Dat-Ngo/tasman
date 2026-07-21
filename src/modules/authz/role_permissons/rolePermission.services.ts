import type { CreateRolePermissionDTO } from "../rbac_authz/rolePermission.types.js";
import { PoolRolePermission } from "./rolePermission.repositories.js";

const repo = new PoolRolePermission();

export async function createRolePermissionService(
  data: CreateRolePermissionDTO,
) {
  return await repo.create(data);
}
