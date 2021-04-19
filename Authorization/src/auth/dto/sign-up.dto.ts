import { IsEmail, IsNumberString, IsString, Length } from "class-validator";

export class SignUpDto {
  @IsString()
  @Length(1, 40)
  id: string;

  @IsString()
  @Length(1, 200)
  password: string;

  @IsString()
  @Length(1, 15)
  name: string;

  @IsString()
  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsString()
  @IsNumberString()
  @Length(1, 6)
  authcode: string;
}
