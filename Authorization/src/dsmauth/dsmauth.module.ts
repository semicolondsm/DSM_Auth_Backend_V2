import { Module } from "@nestjs/common";
import { DsmauthService } from "./dsmauth.service";
import { DsmauthController } from "./dsmauth.controller";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../dsmauth/dsmauth.local.strategy";
import { UserModule } from "../shared/user/user.module";

@Module({
  imports: [ConfigModule, PassportModule, UserModule],
  providers: [DsmauthService, LocalStrategy],
  controllers: [DsmauthController],
})
export class DsmauthModule {}
