import { IsString, Length } from "class-validator";

export class urlDto {
  @IsString()
  @Length(1, 200)
  client_id: string;

  @IsString()
  @Length(1, 200)
  redirect_url: string;
}
