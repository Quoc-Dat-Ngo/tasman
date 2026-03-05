import type { Response } from "express";
import { loginService, registerService } from "./auth.services";
import { sendRefreshToken } from "../../utils/auth.utils";
import type { LoginBodySchema, RegisterBodySchema } from "./auth.schema";
import type { ValidatedRequest } from "../../middlewares/validator";

async function loginController(
  req: ValidatedRequest<typeof LoginBodySchema>,
  res: Response,
) {
  const { email, accessToken, refreshToken } = await loginService(
    req.validated.body,
  );
  sendRefreshToken(res, refreshToken);
  res.status(200).json({
    status: "success",
    email,
    accessToken,
  });
}

async function registerController(
  req: ValidatedRequest<typeof RegisterBodySchema>,
  res: Response,
) {
  await registerService(req.validated.body);
  res.status(201).json({
    status: "success",
  });
}

export { loginController, registerController };
