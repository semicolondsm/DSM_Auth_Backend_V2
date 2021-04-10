import { IsString } from "class-validator";

export class DsmauthLoginDto {
  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsString()
  redirect_url: string;

  @IsString()
  client_id: string;
}
