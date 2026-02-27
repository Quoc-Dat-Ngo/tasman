import type { Request, Response } from "express";
import { loginService, registerService } from "./auth.services";
import { sendRefreshToken } from "../../utils/auth.utils";

async function loginController(req: Request, res: Response) {
  const { email, accessToken, refreshToken } = await loginService(req.body);
  sendRefreshToken(res, refreshToken);
  res.status(200).json({
    status: "success",
    email,
    accessToken,
  });
}

async function registerController(req: Request, res: Response) {
  await registerService(req.body);
  res.status(201).json({
    status: "success",
  });
}

export { loginController, registerController };
