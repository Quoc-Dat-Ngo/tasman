import { PoolRoleRepo } from "./role.repositories.js";

const repo = new PoolRoleRepo();

async function createNewRoleService(name: string) {
  return await repo.create(name);
}

export { createNewRoleService };
