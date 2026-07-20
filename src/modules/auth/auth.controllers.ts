import type { Request, Response } from "express";
import { loginService, registerService } from "./auth.services";
import { sendRefreshToken } from "../../utils/auth.utils";
import type { LoginBodySchema, RegisterBodySchema } from "./auth.schema";
import type { ValidatedRequest } from "../../middlewares/validator";

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

export { loginController, registerController };
