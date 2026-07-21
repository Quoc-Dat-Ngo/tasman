import type { Response } from "express";
import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import type { PermissionString } from "../modules/authz/rbac_authz/permission.types.js";

function createAccessToken(
  user_id: number,
  role: string,
  permissions: PermissionString[],
) {
  return jwt.sign(
    {
      sub: user_id,
      role,
      permissions,
    },
    env.ACCESS_KEY,
    { expiresIn: "15m", algorithm: "HS256" },
  );
}

function createRefreshToken(
  user_id: number,
  role: string,
  permissions: PermissionString[],
) {
  return jwt.sign(
    {
      sub: user_id,
      role,
      permissions,
    },
    env.REFRESH_KEY,
    { expiresIn: "7d", algorithm: "HS256" },
  );
}

function sendRefreshToken(res: Response, token: string) {
  res.cookie("refreshToken", token, {
    path: "/refresh-token",
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
}

export { createAccessToken, createRefreshToken, sendRefreshToken };
