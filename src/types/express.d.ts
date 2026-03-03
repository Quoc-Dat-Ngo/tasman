import type { JWTPayload } from "../modules/auth/jwt_auth/jwtPayload.types";
import { ZodTypes } from "zod";

type RequestValidatedInput<
  B extends ZodType<any, any, any>,
  P extends ZodType<any, any, any>,
  Q extends ZodType<any, any, any>,
> = {
  body: z.infer<B>;
  params?: z.infer<P>;
  query?: z.infer<Q>;
};

declare global {
  namespace Express {
    interface Request {
      // Add user type on successful authentication
      user?: JWTPayload;
      validated: RequestValidatedInput | undefined;
    }
  }
}

export {};
