import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { GetBasicUserData } from "../../use_case/get-basic-user-data";
import { ProxyServiceDynamicModule } from "../use_case_proxy/proxy-service-dynamic.module";
import { UseCaseProxy } from "../use_case_proxy/use-case-proxy";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayloadParser } from "./jwt/decorator/jwt-payload-parser.decorator";
import { IJwtPayload } from "./jwt/interface/jwt-payload.interface";

@Controller("/v1/info/basic")
export class UserController {
  constructor(
    @Inject(ProxyServiceDynamicModule.GET_BASIC_USER_DATA_PROXY_SERVICE)
    private readonly getBasicUserDataProxyService: UseCaseProxy<GetBasicUserData>,
  ) {}

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  public getBasicUserData(@JwtPayloadParser() user: IJwtPayload) {
    return this.getBasicUserDataProxyService
      .getInstance()
      .execute(user.user_identity);
  }
}
