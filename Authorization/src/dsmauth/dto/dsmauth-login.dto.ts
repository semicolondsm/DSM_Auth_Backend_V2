import { IsString, IsUrl, Length } from "class-validator";

export class DsmauthLoginDto {
  @IsString()
  @Length(1, 40)
  id: string;

  @IsString()
  @Length(1, 200)
  password: string;

  @IsString()
  @IsUrl()
  @Length(1, 200)
  redirect_url: string;

  @IsString()
  @Length(1, 100)
  client_id: string;
}
