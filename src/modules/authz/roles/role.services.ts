import { de } from "zod/locales";
import { PoolRoleRepo } from "./role.repositories.js";
import AppError from "../../../errors/AppError.js";

const repo = new PoolRoleRepo();

async function createNewRoleService(name: string) {
  return await repo.create(name);
}

export { createNewRoleService };
