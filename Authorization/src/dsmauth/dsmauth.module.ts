import { Module } from "@nestjs/common";
import { DsmauthService } from "./dsmauth.service";
import { DsmauthController } from "./dsmauth.controller";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./passport/dsmauth.local.strategy";
import { UserModule } from "../shared/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import {
  JwtRefreshStrategy,
  JwtStrategy,
} from "../shared/jwt/passport/jwt.strategy";

@Module({
  imports: [ConfigModule, PassportModule, UserModule, JwtModule.register({})],
  providers: [DsmauthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [DsmauthController],
})
export class DsmauthModule {}
