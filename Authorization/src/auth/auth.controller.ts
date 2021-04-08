import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CheckEmailDto } from "./dto/check-email.dto";
import { CheckIdDto } from "./dto/check-id.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("check/id")
  public async checkAllowedId(@Body() body: CheckIdDto) {
    await this.authService.checkAllowedId(body.id);
    return {
      message: "Allowed ID",
    };
  }

  @Post("/email")
  public async emailAuthentication(@Body() body: CheckEmailDto) {
    await this.authService.emailAuthentication(body.email);
    return {
      meessage: "success",
    };
  }
}
