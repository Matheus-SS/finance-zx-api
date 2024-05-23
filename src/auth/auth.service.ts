import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/constants";
import { Err, Ok, Result } from "../result.type";
import { IUserRepository } from "../users/repository/users.repository.interface";
import { AuthenticationError, ComparePasswordError, DbCommonError, ValidationInputError } from "../users/users.errors";
import { LoginDto } from "./login.dto";
import jwt from 'jsonwebtoken'

@Injectable() 
export class AuthService {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}
  async login(data: LoginDto): Promise<Result<string, ValidationInputError | AuthenticationError | DbCommonError | ComparePasswordError>> {

    const l = LoginDto.create(data)
    let password = '';
    if (l.ok === false) {
      if (l.error.type === 'ValidationInputErr') {
        return Err(new ValidationInputError(l.error.msg))
      }
    } else {
      password = l.value.password
    }

    const u = await this.userRepository.findByEmail(data.email)

    if (u.ok === false) {
      if (u.error.type === 'UserNotFoundErr') {
        return Err(new AuthenticationError("usuario ou senha errados"))
      }
      if (u.error.type === 'DbCommonErr') {
        return Err(new DbCommonError("erro ao logar usuário"))
      }
    }

    if (u.ok === true) {
      const isValidPassword = await u.value.validateHashedPassword(password, u.value.password);
      if (isValidPassword.ok === true) {
        if (isValidPassword.value === false) {
          return Err(new AuthenticationError("usuario ou senha errados"))
        }
      } else {
        return Err(new ComparePasswordError("erro na funcao bcrypt que compara senha"))
      }
    }

    const token = this.generateToken(u.ok === true && u.value.id)

    return Ok(token)
  }

  private generateToken(user_id: number): string {
    return jwt.sign({ user_id: user_id }, 'secret', { expiresIn: '8h' });
  }
}