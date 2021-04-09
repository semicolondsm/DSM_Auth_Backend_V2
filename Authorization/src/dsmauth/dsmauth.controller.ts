import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DsmauthService } from "./dsmauth.service";

@Controller("dsmauth")
export class DsmauthController {
  constructor(private dsmauthService: DsmauthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Req() req) {
    return this.dsmauthService.login(req.user);
  }
}
