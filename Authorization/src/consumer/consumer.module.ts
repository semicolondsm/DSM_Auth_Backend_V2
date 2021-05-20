import { Module } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { ConsumerController } from "./consumer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsumerRepository } from "./entity/consumer.repository";
import { UserRepository } from "../shared/user/entity/user.repository";
import { JwtStrategy } from "../shared/jwt/passport/jwt.strategy";
import { RedirectModule } from "../redirect/redirect.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsumerRepository, UserRepository]),
    JwtStrategy,
    RedirectModule,
  ],
  providers: [ConsumerService],
  controllers: [ConsumerController],
})
export class ConsumerModule {}
