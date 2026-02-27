import type { CreateRolePermissionDTO } from "../rbac_authz/rolePermission.types";
import { PoolRolePermission } from "./rolePermission.repositories";

const repo = new PoolRolePermission();

export async function createRolePermissionService(
  data: CreateRolePermissionDTO,
) {
  return await repo.create(data);
}
