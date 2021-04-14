import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DsmauthService } from "./dsmauth.service";
import { DsmauthLoginDto } from "./dto/dsmauth-login.dto";

@Controller("dsmauth")
export class DsmauthController {
  constructor(private dsmauthService: DsmauthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Body() body: DsmauthLoginDto) {
    return this.dsmauthService.login(body);
  }
}
