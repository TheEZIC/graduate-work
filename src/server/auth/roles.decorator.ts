import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../users/UserRole";

export const Roles = (roles: UserRole[] | UserRole) => {
  if (!Array.isArray(roles)) {
    roles = [roles];
  }

  return SetMetadata("roles", roles);
}
