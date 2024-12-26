import { Body, Controller, Get, Post, Res, Req, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "@service/auth/auth.service";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@extra/guard/auth.guard";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) { }

  @Post('/login')
  // @ApiOperation({ summary: 'create users' })
  // @ApiCreatedResponse({ description: 'Create user successfully', example: 'ok' })
  // @ApiConflictResponse({ description: 'Conflicted email', example: { statusCode: 403, message: 'User already exists' } })
  // @ApiInternalServerErrorResponse({ description: 'Internal Server Error', example: { statusCode: 500, message: 'Internal Server Error' } })
  // @ApiBadRequestResponse({ description: 'Input validation' , example: { statusCode: 400, message: createUserValidationInputError }})
  public async login(@Body() data: LoginDto) {
    const result = await this.authService.login(data);

    return result;
  }

  // @UseGuards(AuthGuard)
  // @Get('/status')
  // public async status(@Res({ passthrough: true }) res: Response) {
  //   res.cookie('authenticated', true, {
  //     httpOnly: false,
  //     sameSite: this.configService.get('app.cookieSameSite'),
  //     maxAge: this.configService.get('app.cookieMaxAge'),
  //     secure: process.env.NODE_ENV === 'production'
  //   });
  //   return 'ok'
  // }
}
