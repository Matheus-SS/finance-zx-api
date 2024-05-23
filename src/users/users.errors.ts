type ErrDomain = {
  errName: string;
  errValue: string;
}

type UserDomainErr = 'UserDomainErr';
type UserNotFoundErr = 'UserNotFoundErr';
type EmailAlreadyExistsErr = 'EmailAlreadyExistsErr';
type GeneratePasswordErr = 'GeneratePasswordErr';
type ComparePasswordErr = 'ComparePasswordErr';
type DbCommonErr = 'DbCommonErr';
type ValidationInputErr = 'ValidationInputErr';
type AuthenticationErr = 'AuthenticationErr';


export class DbCommonError extends Error {
  type: DbCommonErr;
  msg: string;
  constructor(message: string) {
    super();
    this.type = 'DbCommonErr';
    this.msg = message;
  }
}

export class UserDomainError extends Error {
  type: UserDomainErr;
  msg: ErrDomain[];
  constructor(message: ErrDomain[]) {
    super();
    this.type = 'UserDomainErr';
    this.msg = message;
  }
}

export class UserNotFoundError extends Error {
  type: UserNotFoundErr;
  msg: string;
  constructor(msg = 'usuário não encontrado') {
    super();
    this.msg = msg;
    this.type = 'UserNotFoundErr';
  }
}

export class EmailAlreadyExistsError extends Error {
  type: EmailAlreadyExistsErr;
  msg: string;
  constructor(msg: string) {
    super();
    this.msg = msg;
    this.type = 'EmailAlreadyExistsErr';
  }
}

export class GeneratePasswordError extends Error {
  type: GeneratePasswordErr;
  msg: string;
  constructor(msg: string) {
    super();
    this.msg = msg;
    this.type = 'GeneratePasswordErr';
  }
}

export class ComparePasswordError extends Error {
  type: ComparePasswordErr;
  msg: string;
  constructor(msg: string) {
    super();
    this.msg = msg;
    this.type = 'ComparePasswordErr';
  }
}

export class ValidationInputError extends Error {
  type: ValidationInputErr;
  msg: ErrDomain[];
  constructor(msg: ErrDomain[]) {
    super();
    this.msg = msg;
    this.type = 'ValidationInputErr';
  }
}

export class AuthenticationError extends Error {
  type: AuthenticationErr;
  msg: string;
  constructor(msg: string) {
    super();
    this.msg = msg;
    this.type = 'AuthenticationErr';
  }
}