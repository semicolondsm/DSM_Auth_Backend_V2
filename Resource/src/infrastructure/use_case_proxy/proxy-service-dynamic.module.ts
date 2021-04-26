import { DynamicModule, Module } from "@nestjs/common";
import { GetBasicUserData } from "../../use_case/get-basic-user-data";
import { DatabaseUserRepository } from "../repository/database-user.repository";
import { RepositoryModule } from "../repository/repository.module";
import { UseCaseProxy } from "./use-case-proxy";

@Module({
  imports: [RepositoryModule],
})
export class ProxyServiceDynamicModule {
  static GET_BASIC_USER_DATA_PROXY_SERVICE: string =
    "GetBasicUserDataProxyService";

  static register(): DynamicModule {
    return {
      module: ProxyServiceDynamicModule,
      providers: [
        {
          inject: [DatabaseUserRepository],
          provide: ProxyServiceDynamicModule.GET_BASIC_USER_DATA_PROXY_SERVICE,
          useFactory: (databaseUserRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new GetBasicUserData(databaseUserRepository)),
        },
      ],
      exports: [ProxyServiceDynamicModule.GET_BASIC_USER_DATA_PROXY_SERVICE],
    };
  }
}
