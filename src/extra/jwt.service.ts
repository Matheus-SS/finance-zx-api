import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

export interface IJwt {
  generateToken(value: any): string;
};

@Injectable()
export class JwtService implements IJwt {
  constructor(
    private readonly configService: ConfigService
  ) {}

  generateToken(value: any): string {
     return jwt.sign(value, this.configService.get('app.jwtSecret'), {
      expiresIn: this.configService.get('app.jwtExpiresIn')
    })
  }
}