import { IsString, IsUrl, Length } from "class-validator";

export class RegistrationDto {
  @IsString()
  @Length(1, 20)
  consumer: string;

  @IsString()
  @IsUrl()
  @Length(1, 100)
  domain_url: string;

  @IsString()
  @IsUrl()
  @Length(1, 200)
  redirect_url: string;
}

export class RegistrationResponseData {
  client_id: string;
  client_secret: string;
}
