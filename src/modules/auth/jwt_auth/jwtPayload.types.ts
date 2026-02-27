import type { PermissionString } from "../../authz/rbac_authz/permission.types";

export interface JWTPayload {
  sub: number;
  role: string;
  permissions: PermissionString[];
}
