import { Module } from "@nestjs/common";
import { EnvironmentConfigModule } from "./infrastructure/config/environment-config/environment-config.module";
import { TypeormModule } from "./infrastructure/config/typeorm/typeorm.module";

@Module({
  imports: [EnvironmentConfigModule, TypeormModule],
})
export class AppModule {}
