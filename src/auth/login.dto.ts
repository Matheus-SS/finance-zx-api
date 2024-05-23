import { IsNullUndefinedOrEmpty, hasMinLength } from "src/helper";
import { Err, Ok, Result } from "src/result.type";
import { ValidationInputError } from "src/users/users.errors";

type loginDto = {
  email: string;
  password: string;
}

export type ErrDomain = {
  errName: string;
  errValue: string;
}


export class LoginDto {
  email: string;
  password: string;
  constructor(data: loginDto) {
    this.email = data.email
    this.password = data.password
  }

  static create(data: loginDto): Result<LoginDto, ValidationInputError> {
    const err:  ErrDomain[] = []
    if (IsNullUndefinedOrEmpty(data.email)) {
      err.push({
        errName: 'email',
        errValue: 'campo obrigatório'
      })
    }

    if (IsNullUndefinedOrEmpty(data.email)) {
      err.push({
        errName: 'password',
        errValue: 'campo obrigatório'
      })
    }

    if (hasMinLength(data.password, 6)) {
      err.push({
        errName: 'password',
        errValue: 'campo deve conter no mínimo 6 caracteres'
      })
    }

    if (err.length > 0) {
      return Err(new ValidationInputError(err))
    }

    return Ok(new LoginDto({
      email: data.email.trim(),
      password: data.password.trim()
    }))
  }
}