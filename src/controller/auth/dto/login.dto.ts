import { Trim } from "@extra/decorator/trim.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginDto {
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
}
