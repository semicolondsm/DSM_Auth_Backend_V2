import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { IUserReqeust } from "../shared/user/interface/user-request.interface";
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

  @UseGuards(AuthGuard("jwt"))
  @Get("test")
  public test(@Req() req: IUserReqeust) {
    return req.user;
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @Get("test-refresh")
  public testRefresh(@Req() req: IUserReqeust) {
    return req.user;
  }
}
