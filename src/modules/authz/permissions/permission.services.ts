import type { CreatePermissionDTO } from "../rbac_authz/permission.types";
import { PoolPermissionRepo } from "./permission.repositories";

const repo = new PoolPermissionRepo();

async function createNewPermissionService(data: CreatePermissionDTO) {
  return await repo.create(data);
}

export { createNewPermissionService };
