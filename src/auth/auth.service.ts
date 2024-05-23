import { Inject, Injectable } from "@nestjs/common";
import { SESSION_REPOSITORY, USER_REPOSITORY } from "../constants";
import { Err, Ok, Result } from "../result.type";
import { IUserRepository } from "../users/repository/users.repository.interface";
import { AuthenticationError, ComparePasswordError, DbCommonError, ValidationInputError } from "../users/users.errors";
import { LoginDto } from "./login.dto";
import { ISessionRepository } from "../sessions/repository/sessions.repository.interface";
import { convertHourToMili, convertMiliToSec, generateToken, getUnixTime, uuid } from "src/helper";

@Injectable() 
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(SESSION_REPOSITORY) private readonly sessionRepository: ISessionRepository
  ) {}
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

    const hourToMili = convertHourToMili(8)
    const currentTime = getUnixTime()
    const expires = currentTime + hourToMili
    const s = await this.sessionRepository.create({
      id: uuid(),
      user_id: u.ok === true && u.value.id,
      created_at: currentTime,
      expires_in: expires,
      is_active: true
    })

    if (s.ok === false) {
      if (s.error.type === 'ValidationInputErr') {
        return Err(new ValidationInputError(s.error.msg))
      } else {
        return Err(new DbCommonError("erro ao criar sessão"))
      }
    }
  
    const token = generateToken(s.ok === true && s.value.id, convertMiliToSec(hourToMili))

    return Ok(token)
  } 
}