import { Module } from "@nestjs/common";
import { DsmauthService } from "./dsmauth.service";
import { DsmauthController } from "./dsmauth.controller";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../dsmauth/dsmauth.local.strategy";
import { UserModule } from "../shared/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET_KEY } from "../shared/jwt/jwt.constant";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
    }),
  ],
  providers: [DsmauthService, LocalStrategy],
  controllers: [DsmauthController],
})
export class DsmauthModule {}
