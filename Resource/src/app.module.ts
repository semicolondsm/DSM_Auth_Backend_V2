import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EnvironmentConfigService } from "./infrastructure/config/environment-config/environment-config.service";
import { EnvironmentConfigModule } from "./infrastructure/config/environment-config/environment-config.module";

@Module({
  imports: [EnvironmentConfigModule],
  controllers: [AppController],
  providers: [AppService, EnvironmentConfigService],
})
export class AppModule {}
