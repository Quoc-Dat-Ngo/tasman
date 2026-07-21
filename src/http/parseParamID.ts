import type { ExpressParamID } from "../types/index.types.js";
import { z } from "zod";

const ParamsSchema = z.string().trim().min(1);

export function parseParamID(id: ExpressParamID) {
  const returnId = ParamsSchema.parse(id);
  return returnId;
}
