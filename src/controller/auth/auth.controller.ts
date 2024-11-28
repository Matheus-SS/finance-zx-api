import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "@service/auth/auth.service";


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){}
 
  @Post('/login')
  // @ApiOperation({ summary: 'create users' })
  // @ApiCreatedResponse({ description: 'Create user successfully', example: 'ok' })
  // @ApiConflictResponse({ description: 'Conflicted email', example: { statusCode: 403, message: 'User already exists' } })
  // @ApiInternalServerErrorResponse({ description: 'Internal Server Error', example: { statusCode: 500, message: 'Internal Server Error' } })
  // @ApiBadRequestResponse({ description: 'Input validation' , example: { statusCode: 400, message: createUserValidationInputError }})
  public async login(@Body() data: LoginDto) {
    const res = await this.authService.login(data)
    return res;
  }
}