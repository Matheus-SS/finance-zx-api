import { IsEmail, IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(2, {
    message: 'nome deve ser maior ou igual a 2 caracteres'
  })
  @MaxLength(50, {
    message: 'nome deve ser menor ou igual a 50 caracteres'
  })
  name: string;

  @IsEmail({}, {
    message: 'email deve ser um email válido'
  })
  email: string;

  @IsOptional()
  @MinLength(10, {
    message: 'avatarUrl deve ser maior ou igual a 10 caracteres'
  })
  @MaxLength(250, {
    message: 'avatarUrl deve ser menor ou igual a 250 caracteres'
  })
  @IsString({
    message: "avatarUrl deve ser string"
  })
  urlAvatar?: null | string;

  @MinLength(6, {
    message: 'senha deve ser maior ou igual a 6 caracteres'
  })
  @MaxLength(25, {
    message: 'senha deve ser menor ou igual a 25 caracteres'
  })
  password: string;

  @IsOptional()
  @IsInt({
    message: 'IdConfiguração deve ser um número inteiro'
  })
  @Min(1, {
    message: 'IdConfiguração não deve ser menor que 1'
  })
  settingId?: null | number;
}