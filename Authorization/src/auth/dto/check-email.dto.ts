import { IsString, Length } from "class-validator";

export class CheckEmailDto {
  @IsString()
  @Length(5, 50)
  email: string;
}
