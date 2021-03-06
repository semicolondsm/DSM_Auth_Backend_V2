import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ProxyServiceDynamicModule } from "../use_case_proxy/proxy-service-dynamic.module";
import { HttpExceptionFilter } from "./filter/http-exception.filter";
import { JwtStrategy } from "./jwt/passport/jwt.strategy";
import { UserController } from "./user.controller";

@Module({
  imports: [ProxyServiceDynamicModule.register(), JwtStrategy],
  controllers: [UserController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class RestModule {}
