import type { CreatePermissionDTO } from "../rbac_authz/permission.types.js";
import { PoolPermissionRepo } from "./permission.repositories.js";

const repo = new PoolPermissionRepo();

async function createNewPermissionService(data: CreatePermissionDTO) {
  return await repo.create(data);
}

export { createNewPermissionService };
