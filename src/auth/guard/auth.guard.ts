import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //console.log(request.headers.authorization);// recibe el token en el header
    const token = this.extractTokenFromHeader(request);
    //console.log(token);
    if (!token) {
      throw new UnauthorizedException('You are not authorized');
    }
    try{
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret,
        }
        
        );
        request['user'] = payload;
    }catch{
      throw new UnauthorizedException('You are not authorized | NO TOKEN');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined{
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
