import { Module } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
import { ConsumerController } from "./consumer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsumerRepository } from "./entity/consumer.repository";
import { UserRepository } from "src/shared/user/entity/user.repository";
import { JwtStrategy } from "src/shared/jwt/passport/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsumerRepository, UserRepository]),
    JwtStrategy,
  ],
  providers: [ConsumerService],
  controllers: [ConsumerController],
})
export class ConsumerModule {}
