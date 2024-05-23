import { Err, Ok, Result } from '../result.type';
import bcrypt from "bcrypt";
import { ComparePasswordError, GeneratePasswordError, UserDomainError } from './users.errors';

const NAME_MIN_LENGTH = "nome deve conter pelo menos 4 caracteres."
const USERNAME_MIN_LENGTH = "usuario deve conter pelo menos 4 caracteres."

export type ErrDomain = {
  errName: string;
  errValue: string;
}

type UserProps = {
  id?: number;
  name: string;
  username: string;
  email: string;
  password: string;
  created_at: number; 
  updated_at?: number;
}

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  created_at: number; 
  updated_at?: number;
  private err: ErrDomain[]
  constructor(data: UserProps) {
    this.id = data.id; 
    this.name = data.name?.trim(); 
    this.username = data.username?.trim(); 
    this.email = data.email?.trim(); 
    this.password = data.password?.trim(); 
    this.updated_at = data?.updated_at;
    this.created_at = data?.created_at;
    this.err = []
  }

  validate(): Result<User, UserDomainError> {
    // if (this.username === undefined || this.username === "") {
    //   this.err.push({
    //     errName: 'username',
    //     errValue: 'campo obrigatório'
    //   })
    // }

    if (this.name?.length < 4) {
      this.err.push({
        errName: 'name',
        errValue: NAME_MIN_LENGTH
      })
    }
    
    if (this.username?.length < 4) {
      this.err.push({
        errName: 'username',
        errValue: USERNAME_MIN_LENGTH
      })
    }

    if (this.err.length > 0) {
      return Err(new UserDomainError(this.err))
    }
    return Ok(new User(
      {
        id: this.id,
        name: this.name, 
        username: this.username, 
        email: this.email,
        password: this.password,
        updated_at: this.updated_at,
        created_at: this.created_at, 
      }
    ))
  }

  public async generateHashPassword(): Promise<Result<string, GeneratePasswordError>> {
    try {
      const hash = await bcrypt.hash(this.password, 8);
      this.password = hash
      return Ok(hash)
    } catch (error) {
      console.log("erro ao gerar hash de senha", error)
      return Err(new GeneratePasswordError("erro ao gerar hash de senha"))
    }
  }

  public async validateHashedPassword(password: string, hashedPassword: string): Promise<Result<boolean, ComparePasswordError>> {
    try {
      const isValid = await bcrypt.compare(password, hashedPassword)
      return Ok(isValid)
    } catch (error) {
      console.log("erro ao comparar senha")
      return Err(new ComparePasswordError("erro ao comparar senha"))
    }
  }

}
