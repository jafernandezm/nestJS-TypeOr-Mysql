import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflactor: Reflector,
  ) { } 
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const roles = this.reflactor.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!roles) {
      return true;
    }
    
    const {user} = context.switchToHttp().getRequest();

    if(user.role === Role.ADMIN){
      return true;
    }
    
    console.log(user.role);
    return roles === user.role;
  }
}
