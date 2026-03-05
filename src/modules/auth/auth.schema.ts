import * as z from "zod";
import type { PermissionString } from "../authz/rbac_authz/permission.types";

export const LoginBodySchema = z.object({
  email: z.email(),
  password: z.string().trim().min(9),
});

export const RegisterBodySchema = z.object({
  first_name: z.string().trim().min(1),
  last_name: z.string().trim().min(1),
  email: z.email(),
  password: z.string().trim().min(9),
});

const actions = ["read", "create", "update", "delete"] as const;

const resources = [
  "student",
  "instructor",
  "course",
  "major",
  "department",
  "user",
  "role",
  "permission",
  "enrollment",
  "studentMajor",
  "courseInstructor",
  "rolePermission",
] as const;

const PermissionSchema = z.custom<PermissionString>((val) => {
  if (typeof val !== "string" || !val.includes(":")) return false;

  const [action, resource] = val.split(":");

  return actions.includes(action as any) && resources.includes(resource as any);
});

export const JWTPayloadBodySchema = z.object({
  sub: z.number().int().positive(),
  role: z.string().trim().min(1),
  permissions: z.array(PermissionSchema),
});
