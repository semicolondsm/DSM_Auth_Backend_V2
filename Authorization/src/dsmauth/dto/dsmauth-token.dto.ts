import { IsString, Length } from "class-validator";

export class DsmauthProvideTokenDto {
  @IsString()
  @Length(1, 200)
  client_id: string;

  @IsString()
  @Length(1, 200)
  client_secret: string;

  @IsString()
  @Length(1, 200)
  code: string;
}
