import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, RCreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Err, Ok, Result } from '../result.type';
import { User } from './users.entity';
import { UserDomainError, DbCommonError, EmailAlreadyExistsError, GeneratePasswordError } from './users.errors';
import { IUserRepository } from './repository/users.repository.interface';
import { USER_REPOSITORY } from '../constants';
import { getUnixTime } from 'src/helper';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}
  async create(createUserDto: CreateUserDto): Promise<Result<RCreateUserDto, UserDomainError | DbCommonError  | EmailAlreadyExistsError | GeneratePasswordError>> {
    const user = new User({
      name: createUserDto.name,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      created_at: null,
      updated_at: null
    })
    const validate = user.validate()

    if (validate.ok === false) {
      if (validate.error.type === 'UserDomainErr') {
        return Err(new UserDomainError(validate.error.msg))
      }
    }

    const ue = await this.userRepository.findByEmail(user.email)

    if (ue.ok === false) {
      if (ue.error.type === 'DbCommonErr') {
        return Err(new DbCommonError(ue.error.message))
      }
    }

    if (ue.ok === true) {
      return Err(new EmailAlreadyExistsError("usuario já existe"))
    }

    const p = await user.generateHashPassword();
    let pHash: string = '';

    if (p.ok === false) {
      if (p.error.type === 'GeneratePasswordErr') {
        console.log(p.error.message)
        return Err(new GeneratePasswordError("erro ao criar usuario"))
      }
    } else {
      pHash = p.value
    }
    
    const u = await this.userRepository.create({
      email: user.email,
      name: user.email,
      password: pHash,
      username: user.username,
      created_at: getUnixTime()
    })

    if (u.ok === false) {
      if (u.error.type === "DbCommonErr") {
        return Err(new DbCommonError(u.error.message))
      }
    } else {
      return Ok(new RCreateUserDto({
        id: u.value.id,
        email: u.value.email,
        name: u.value.name,
        username: u.value.username,
        created_at: u.value.created_at
      }))
    }
    
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
