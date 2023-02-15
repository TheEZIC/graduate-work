import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from "../users/UserRole";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return false;
    }

    const user = this.jwtService.verify(token);
    request.user = user;

    if (!user) {
      return false;
    }

    return this.matchRoles(roles, user);
  }

  private matchRoles(roles: UserRole[], user: any): boolean {
    const userRoles = user.role;

    if (Array.isArray(userRoles)) {
      for (let userRole of userRoles) {
        if (!roles.includes(userRole)) {
          return false;
        }
      }
    } else {
      console.log(userRoles);
      return roles.includes(userRoles);
    }

    return true;
  }
}
