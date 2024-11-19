import { IsEmail, IsInt, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString({
    message: "validation.user.IS_STRING_NAME"
  })
  @MinLength(2, {
    message: 'validation.user.MIN_LENGTH_NAME'
  })
  @MaxLength(50, {
    message: 'validation.user.MAX_LENGTH_NAME'
  })
  name: string;

  @IsString({
    message: "validation.user.IS_STRING_EMAIL"
  })
  @IsEmail({}, {
    message: 'validation.user.INVALID_EMAIL'
  })
  email: string;

  @IsOptional()
  @MinLength(10, {
    message: 'validation.user.MIN_LENGTH_URL_AVATAR'
  })
  @MaxLength(250, {
    message: 'validation.user.MAX_LENGTH_URL_AVATAR'
  })
  @IsString({
    message: "validation.user.IS_STRING_URL_AVATAR"
  })
  urlAvatar?: null | string;

  @MinLength(6, {
    message: 'validation.user.MIN_LENGTH_PASSWORD'
  })
  @MaxLength(25, {
    message: 'validation.user.MAX_LENGTH_PASSWORD'
  })
  @IsString({
    message: "validation.user.IS_STRING_PASSWORD"
  })
  password: string;

  @IsOptional()
  @IsInt({
    message: 'validation.user.IS_INT_SETTING_ID'
  })
  @Min(1, {
    message: 'validation.user.MIN_SETTING_ID'
  })
  settingId?: null | number;
}