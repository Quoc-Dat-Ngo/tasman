import type { NextFunction, Request, Response } from "express";
import { ZodType, z } from "zod";
import AppError from "../errors/AppError";

export type ValidatedRequest<
  B extends ZodType<any, any, any>,
  P extends ZodType<any, any, any> | undefined = undefined,
  Q extends ZodType<any, any, any> | undefined = undefined,
> = Request & {
  validated: {
    body: z.infer<B>;
    params: P extends ZodType ? z.infer<P> : undefined;
    query: Q extends ZodType ? z.infer<Q> : undefined;
  };
};

export function controllerValidator<
  B extends ZodType<any, any, any>,
  P extends ZodType<any, any, any>,
  Q extends ZodType<any, any, any>,
>(bodySchema: B, idSchema?: P, querySchema?: Q) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = bodySchema.parse(req.body);
      const validatedParams = idSchema?.parse(req.params);
      const validatedQuery = querySchema?.parse(req.query);

      req.validated = {
        body: validatedBody,
        params: validatedParams,
        query: validatedQuery,
      };

      next();
    } catch (error) {
      next(new AppError("Invalid input data", 400));
    }
  };
}
