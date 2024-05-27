import { Controller, Get, Post, Body, Patch, Param, Delete, UnprocessableEntityException, InternalServerErrorException, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ServerException, ServerResponse, http } from 'src/helper';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
      const result =  await this.usersService.create(createUserDto);    
      if (result.ok === false) {
        if (result.error.type === 'UserDomainErr') {
          throw new ServerException(result.error.msg, http.StatusUnprocessable, result.error) 
        } else if (result.error.type === 'EmailAlreadyExistsErr') {
          throw new ServerException(result.error.msg, http.StatusUnprocessable, result.error) 
        } else if (result.error.type === 'DbCommonErr') {
          throw new ServerException("internal server error", http.StatusInternalServer, result.error) 
        } else if (result.error.type === 'GeneratePasswordErr') {
          throw new ServerException("internal server error", http.StatusInternalServer, result.error) 
        } else {
          throw new ServerException("internal server error", http.StatusInternalServer, result.error)
        }
      } else {
        return new ServerResponse(result.value)
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
