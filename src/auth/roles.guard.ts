import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles[0] === 'pass') {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers['authorization'];
    //const user = request.user;
    // return matchRoles(roles, user.roles);
    return true;
  }
}
