import type { JWTPayload } from "../modules/auth/jwt_auth/jwtPayload.types";

declare global {
  namespace Express {
    interface Request {
      // Add user type on successful authentication
      user?: JWTPayload;
    }
  }
}

export {};
