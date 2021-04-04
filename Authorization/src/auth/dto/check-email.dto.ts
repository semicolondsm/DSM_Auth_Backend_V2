import { IsString } from "class-validator";

export class CheckEmailDto {
  @IsString()
  email: string;
}
