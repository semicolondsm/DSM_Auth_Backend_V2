import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EnvironmentConfigModule } from "../environment-config/environment-config.module";
import { EnvironmentConfigService } from "../environment-config/environment-config.service";

export const getTypeOrmModuleOptions = (
  environmentConfigService: EnvironmentConfigService,
): TypeOrmModuleOptions => ({
  type: "mysql",
  host: environmentConfigService.get("PRODUCTION_DATABASE_HOST"),
  port: +environmentConfigService.get("PRODUCTION_DATABASE_PORT"),
  username: environmentConfigService.get("PRODUCTION_DATABASE_USER"),
  password: environmentConfigService.get("PRODUCTION_DATABASE_PASSWORD"),
  database: environmentConfigService.get("PRODUCTION_DATABASE_NAME"),
  entities: [],
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeormConfigModule {}
