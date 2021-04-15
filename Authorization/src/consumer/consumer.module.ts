import { Module } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { ConsumerController } from "./consumer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsumerRepository } from "./entity/consumer.repository";
import { UserRepository } from "../shared/user/entity/user.repository";
import { JwtStrategy } from "../shared/jwt/passport/jwt.strategy";
import { RedirectRepository } from "./entity/redirect.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsumerRepository,
      UserRepository,
      RedirectRepository,
    ]),
    JwtStrategy,
  ],
  providers: [ConsumerService],
  controllers: [ConsumerController],
})
export class ConsumerModule {}
