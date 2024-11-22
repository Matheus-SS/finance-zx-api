import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { UserService } from "../../service/user.service";
import { CreateUserDto } from "./dto/createUser.dto";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

 
  @Post('')
  public async create(@Body() createUserDto: CreateUserDto) {
    console.log("CREATE", createUserDto);
    const r = await this.userService.create(createUserDto)
    return 'heelo';
  }
}