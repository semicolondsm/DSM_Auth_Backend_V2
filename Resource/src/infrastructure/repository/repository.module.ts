import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvironmentConfigModule } from "../config/environment-config/environment-config.module";
import { TypeormConfigModule } from "../config/typeorm/typeorm-config.module";
import { DatabaseUserRepository } from "./database-user.repository";
import { UserEntity } from "./entity/user.entity";

@Module({
  imports: [
    TypeormConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
    EnvironmentConfigModule,
  ],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class RepositoryModule {}
