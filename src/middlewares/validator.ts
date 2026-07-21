import type { NextFunction, Request, Response } from "express";
import { ZodType, z } from "zod";
import AppError from "../errors/AppError.js";

export type ValidatedRequest<
  B extends ZodType<any, any, any> | undefined = undefined,
  P extends ZodType<any, any, any> | undefined = undefined,
  Q extends ZodType<any, any, any> | undefined = undefined,
> = Request & {
  validated: {
    body: B extends ZodType ? z.infer<B> : undefined;
    params: P extends ZodType ? z.infer<P> : undefined;
    query: Q extends ZodType ? z.infer<Q> : undefined;
  };
};

export function controllerValidator<
  B extends ZodType<any, any, any> | undefined = undefined,
  P extends ZodType<any, any, any> | undefined = undefined,
  Q extends ZodType<any, any, any> | undefined = undefined,
>(bodySchema: B, idSchema?: P, querySchema?: Q) {
  return (req: Request, res: Response, next: NextFunction) => {
    const v = req as ValidatedRequest<B, P, Q>;
    v.validated = {
      body: undefined as any,
      params: undefined as any,
      query: undefined as any,
    };

    if (bodySchema) {
      const bodyResult = bodySchema.safeParse(req.body);
      if (!bodyResult.success) {
        return next(new AppError(z.prettifyError(bodyResult.error), 400));
      }

      v.validated.body = bodyResult.data;
    }

    if (idSchema) {
      const paramsResult = idSchema.safeParse(req.params);
      if (!paramsResult.success) {
        return next(new AppError(z.prettifyError(paramsResult!.error), 400));
      }
      v.validated.params = paramsResult.data;
    }

    if (querySchema) {
      const queryResult = querySchema.safeParse(req.query);
      if (!queryResult?.success) {
        return next(new AppError(z.prettifyError(queryResult!.error), 400));
      }
      v.validated.query = queryResult.data;
    }

    next();
  };
}
