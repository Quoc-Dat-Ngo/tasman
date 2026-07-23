import type { Request, Response } from "express";
import {
  loginService,
  registerService,
  logoutService,
  refreshTokenService,
} from "./auth.services.js";
import { sendRefreshToken } from "../../utils/auth.utils.js";
import type { LoginBodySchema, RegisterBodySchema } from "./auth.schema.js";
import type { ValidatedRequest } from "../../middlewares/validator.js";

type LoginRequest = ValidatedRequest<typeof LoginBodySchema>;
type RegisterRequest = ValidatedRequest<typeof RegisterBodySchema>;

async function loginController(req: Request, res: Response) {
  const { body } = (req as unknown as LoginRequest).validated;
  const { email, accessToken, refreshToken } = await loginService(body);
  sendRefreshToken(res, refreshToken);
  res.status(200).json({
    status: "success",
    email,
    accessToken,
  });
}

async function registerController(req: Request, res: Response) {
  const { body } = (req as unknown as RegisterRequest).validated;
  await registerService(body);
  res.status(201).json({
    status: "success",
  });
}

function logoutController(req: Request, res: Response) {
  logoutService(req, res);
  res.status(200).json({
    status: "Success",
    message: "Logged out",
  });
}

async function refreshTokenController(req: Request, res: Response) {
  const { accessToken, refreshToken } = await refreshTokenService(req);
  sendRefreshToken(res, refreshToken);
  res.status(200).json({
    message: "New refresh token generated",
    accessToken,
  });
}

export {
  loginController,
  registerController,
  logoutController,
  refreshTokenController,
};
