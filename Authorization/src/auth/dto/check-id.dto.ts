import { IsString, Length } from "class-validator";

export class CheckIdDto {
  @IsString()
  @Length(1, 40)
  id: string;
}
