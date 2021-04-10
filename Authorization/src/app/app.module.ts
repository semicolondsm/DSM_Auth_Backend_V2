import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { DsmauthModule } from "../dsmauth/dsmauth.module";
import { connectionOptions } from "src/ormconfig";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_FILTER } from "@nestjs/core";
import { HttpErrorFilter } from "../shared/exception/exception.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => connectionOptions],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get(process.env.NODE_ENV),
      inject: [ConfigService],
    }),
    AuthModule,
    DsmauthModule,
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
