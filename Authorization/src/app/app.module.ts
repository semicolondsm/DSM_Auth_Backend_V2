import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { DsmauthModule } from "../dsmauth/dsmauth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_FILTER } from "@nestjs/core";
import { HttpErrorFilter } from "../shared/exception/exception.filter";
import { ConsumerModule } from "../consumer/consumer.module";
import { ConsumerRepository } from "../consumer/entity/consumer.repository";
import { UserRepository } from "../shared/user/entity/user.repository";
import { TypeOrmConfigModule } from "../typeorm/typeorm-config.module";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([ConsumerRepository, UserRepository]),
    AuthModule,
    DsmauthModule,
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
