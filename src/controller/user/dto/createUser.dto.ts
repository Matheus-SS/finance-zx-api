import { IsEmail, IsInt, IsOptional, IsString, Length, Min } from "class-validator";
import { Trim } from "../../../extra/decorator/trim.decorator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: 'jhon doe'
  })
  @IsString({
    message: "validation.user.IS_STRING_NAME"
  })
  @Length(2, 50, {
    message: 'validation.user.LENGTH_NAME'
  })
  @Trim()
  name: string;

  @ApiProperty({
    example: 'jhon@doe.com'
  })
  @IsString({
    message: "validation.user.IS_STRING_EMAIL"
  })
  @IsEmail({}, {
    message: 'validation.user.INVALID_EMAIL'
  })
  @Trim()
  email: string;

  @ApiProperty({
    example: null,
    required: false,
    type: "string"
  })
  @Transform(({ value }) => (value === '' ? null : value))
  @Trim()
  @IsOptional()
  @Length(10, 250, {
    message: 'validation.user.LENGTH_URL_AVATAR'
  })
  @IsString({
    message: "validation.user.IS_STRING_URL_AVATAR"
  })
  url_avatar?: null | string;

  @ApiProperty({
    example: 'abcdef'
  })
  @Length(6, 25, {
    message: 'validation.user.LENGTH_PASSWORD'
  })
  @IsString({
    message: "validation.user.IS_STRING_PASSWORD"
  })
  @Trim()
  password: string;

  @ApiProperty({
    example: null, 
    required: false,
    type: "number"
  })
  @IsOptional()
  @IsInt({
    message: 'validation.user.IS_INT_SETTING_ID'
  })
  @Min(1, {
    message: 'validation.user.MIN_SETTING_ID'
  })
  setting_id?: null | number;
}