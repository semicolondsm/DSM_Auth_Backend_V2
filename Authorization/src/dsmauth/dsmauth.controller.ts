import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtBearerGuard } from "../shared/jwt/guard/jwt-bearer.guard";
import {
  ACCESS_TOKEN_HEADER,
  REFRESH_TOKEN_HEADER,
} from "../shared/jwt/jwt.constant";
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
}
