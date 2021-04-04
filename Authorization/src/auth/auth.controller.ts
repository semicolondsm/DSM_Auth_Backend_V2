import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CheckIdDto } from "./dto/check-id.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("check/id")
  public async checkAllowedId(@Body() body: CheckIdDto) {
    await this.authService.checkAllowedId(body.id);
    return "Allowed ID";
  }
}
