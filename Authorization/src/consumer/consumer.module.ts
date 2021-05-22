import { Module } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { ConsumerController } from "./consumer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsumerRepository } from "./entity/consumer.repository";
import { JwtStrategy } from "../shared/jwt/passport/jwt.strategy";
import { RedirectModule } from "../redirect/redirect.module";
import { UserModule } from "../shared/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsumerRepository]),
    JwtStrategy,
    RedirectModule,
    UserModule,
  ],
  providers: [ConsumerService],
  controllers: [ConsumerController],
})
export class ConsumerModule {}
