import type { NextFunction, Request, Response } from "express";
import { ZodType, z } from "zod";
import AppError from "../errors/AppError";

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
      throw new AppError("Invalid input data " + error, 400);
    }
  };
}
