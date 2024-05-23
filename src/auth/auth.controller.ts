import { Controller, Post, Body, Res } from '@nestjs/common';
import { ServerResponse, http } from 'src/helper';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() createUserDto: LoginDto, @Res() response: Response) {
    try {
      const result =  await this.authService.login(createUserDto);    
      if (result.ok === false) {
        if (result.error.type === 'AuthenticationErr') {
          return ServerResponse(response, http.StatusUnprocessable, result.error.msg) 
        } else if (result.error.type === 'DbCommonErr') {
          return ServerResponse(response, http.StatusUnprocessable, result.error.msg) 
        } else if (result.error.type === 'ValidationInputErr') {
          return ServerResponse(response, http.StatusUnprocessable, result.error.msg) 
        } else {
          console.log(result.error)
          return ServerResponse(response, http.StatusInternalServer, "internal server error")
        }
      } else {
        return ServerResponse(response, http.StatusOk, {
          access_token: result.value
        })
      }
    } catch (error) {
      console.log("login - controller", error)
      return ServerResponse(response, http.StatusInternalServer, "internal server error")
    }
    
  }
}
