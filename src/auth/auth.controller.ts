import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ServerException, ServerResponse, http } from 'src/helper';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  async login(@Body() createUserDto: LoginDto) {
      const result =  await this.authService.login(createUserDto);    
      if (result.ok === false) {
        if (result.error.type === 'AuthenticationErr') {
          throw new ServerException(result.error.msg, http.StatusUnprocessable, result.error)
        } else if (result.error.type === 'DbCommonErr') {
          throw new ServerException(result.error.msg, http.StatusInternalServer, result.error)
        } else if (result.error.type === 'ValidationInputErr') {
          throw new ServerException(result.error.msg, http.StatusUnprocessable, result.error)
        } else {
          console.log(result.error)
          throw new ServerException("internal server error", http.StatusInternalServer, result.error)
        }
      } else {
        return new ServerResponse({ access_token: result.value })
      }
  }
}
