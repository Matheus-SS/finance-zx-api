import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { IJwt } from '../jwt.service';
import { JWT_SERVICE } from '@app/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JWT_SERVICE) private jwtService: IJwt
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromAuthorization(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verifyToken(
        token,
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['userId'] = payload['userId'];
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromAuthorization(request: Request): string {
    const [, token] = request.headers['authorization']?.split(' ') ?? '';
    return token;
  }
}