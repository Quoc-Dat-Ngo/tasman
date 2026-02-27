import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { env } from "../config/env";
import type { JWTPayload } from "../modules/auth/jwt_auth/jwtPayload.types";

export function authenticate() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorisation = req.headers["authorization"];
    if (!authorisation)
      throw new AppError("Please log in to access our service", 401);

    const accessToken = authorisation.split(" ")[1];
    if (!accessToken)
      throw new AppError("Missing token or not a valid one", 401);
    const user = jwt.verify(accessToken, env.ACCESS_KEY);

    // Manual type assertion for now, put later will use Zod
    console.log(user);
    if (
      typeof user !== "object" ||
      !("sub" in user) ||
      typeof user.sub !== "number" ||
      !("role" in user) ||
      typeof user.role !== "string" ||
      !("permissions" in user) ||
      !Array.isArray(user.permissions)
    ) {
      throw new AppError("Invalid token payload", 401);
    }
    req.user = user as unknown as JWTPayload;
    next();
  };
}
