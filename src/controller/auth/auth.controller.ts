import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "@service/auth/auth.service";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { UserId } from "@extra/decorator/userId.decorator";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ){}
 
  @Post('/login')
  // @ApiOperation({ summary: 'create users' })
  // @ApiCreatedResponse({ description: 'Create user successfully', example: 'ok' })
  // @ApiConflictResponse({ description: 'Conflicted email', example: { statusCode: 403, message: 'User already exists' } })
  // @ApiInternalServerErrorResponse({ description: 'Internal Server Error', example: { statusCode: 500, message: 'Internal Server Error' } })
  // @ApiBadRequestResponse({ description: 'Input validation' , example: { statusCode: 400, message: createUserValidationInputError }})
  public async login(@Body() data: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(data);
    console.log("result", result);
    res.cookie('access_token', result.access_token, {
      httpOnly: process.env.NODE_ENV === 'production',
      sameSite: "none",
      maxAge: 60 * 60 * 6 * 1000,
      secure: process.env.NODE_ENV === 'production'
    });
    
    return 'ok';
  }

  @Get('/status')
  public async status(@UserId() data) {
    return 'ok'
  }
}