import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { connectionOptions } from "src/ormconfig";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions[process.env.NODE_ENV])],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
