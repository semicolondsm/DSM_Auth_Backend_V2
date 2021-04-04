import { IsString } from "class-validator";

export class CheckIdDto {
  @IsString()
  id: string;
}
