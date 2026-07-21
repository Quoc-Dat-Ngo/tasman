import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.js";
import { env } from "../config/env.js";
import type { JWTPayload } from "../modules/auth/jwt_auth/jwtPayload.types.js";
import { JWTPayloadBodySchema } from "../modules/auth/auth.schema.js";

export function authenticate() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorisation = req.headers["authorization"];
    if (!authorisation)
      return next(new AppError("Please log in to access our service", 401));

    const accessToken = authorisation!.split(" ")[1];
    if (!accessToken)
      next(new AppError("Missing token or not a valid one", 401));
    const user = jwt.verify(accessToken!, env.ACCESS_KEY);

    const validatedPayload: JWTPayload = JWTPayloadBodySchema.parse(user);

    req.user = validatedPayload as unknown as JWTPayload;
    next();
  };
}
