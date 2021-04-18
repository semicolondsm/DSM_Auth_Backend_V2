import { IsEmail, IsString, Length } from "class-validator";

export class CheckEmailDto {
  @IsString()
  @IsEmail()
  @Length(5, 50)
  email: string;
}
