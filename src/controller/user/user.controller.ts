import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "@service/user/user.service"
import { CreateUserDto } from "./dto/createUser.dto";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation } from "@nestjs/swagger";
import { createUserValidationInputError } from "./dto/exampleResponse";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}
 
  @Post('')
  @ApiOperation({ summary: 'create users' })
  @ApiCreatedResponse({ description: 'Create user successfully', example: 'ok' })
  @ApiConflictResponse({ description: 'Conflicted email', example: { statusCode: 403, message: 'User already exists' } })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', example: { statusCode: 500, message: 'Internal Server Error' } })
  @ApiBadRequestResponse({ description: 'Input validation' , example: { statusCode: 400, message: createUserValidationInputError }})
  public async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.userService.create(createUserDto)
    return res;
  }
}