import type { NextFunction, Request, Response } from "express";
import type { PermissionString } from "../modules/authz/rbac_authz/permission.types";
import AppError from "../errors/AppError";

export function authorise(permission: PermissionString) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user)
      throw new AppError(
        "Insufficient credentials. Logging in to prove your identity",
        401,
      );
    if (!req.user.permissions.includes(permission)) {
      throw new AppError("Permission is not sufficient to make request", 403);
    }
    next();
  };
}
