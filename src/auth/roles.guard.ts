import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user/entities/role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // Se não há roles definidas na rota, permite o acesso
    }
    const { user } = context.switchToHttp().getRequest();
    // Verifica se o usuário tem pelo menos uma das roles necessárias
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
