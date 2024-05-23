import { Controller, Get, Post, Body, Patch, Param, Delete, UnprocessableEntityException, InternalServerErrorException, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ServerResponse, http } from 'src/helper';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    try {
      const result =  await this.usersService.create(createUserDto);    
      if (result.ok === false) {
        if (result.error.type === 'UserDomainErr') {
          return ServerResponse(response, http.StatusUnprocessable, result.error.msg) 
        } else if (result.error.type === 'EmailAlreadyExistsErr') {
          return ServerResponse(response, http.StatusUnprocessable, result.error.msg) 
        } else if (result.error.type === 'DbCommonErr') {
          return ServerResponse(response, http.StatusInternalServer, result.error.msg) 
        } else if (result.error.type === 'GeneratePasswordErr') {
          return ServerResponse(response, http.StatusInternalServer, result.error.msg) 
        } else {
          console.log(result.error)
          return ServerResponse(response, http.StatusInternalServer, "internal server error")
        }
      } else {
        return ServerResponse(response, http.StatusCreated, result.value)
      }
    } catch (error) {
      console.log("create - controller", error)
      return ServerResponse(response, http.StatusInternalServer, "internal server error")
    }
    
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
