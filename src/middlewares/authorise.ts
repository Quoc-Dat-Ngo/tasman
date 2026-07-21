import type { NextFunction, Request, Response } from "express";
import type { PermissionString } from "../modules/authz/rbac_authz/permission.types.js";
import AppError from "../errors/AppError.js";

export function authorise(permission: PermissionString) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user)
      next(
        new AppError(
          "Insufficient credentials. Logging in to prove your identity",
          401,
        ),
      );
    if (!req.user!.permissions.includes(permission)) {
      next(new AppError("Permission is not sufficient to make request", 403));
    }
    next();
  };
}
