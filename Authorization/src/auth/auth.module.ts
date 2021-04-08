import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/shared/user/user.module";
import { UserRepository } from "../shared/user/entity/user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), ConfigModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
