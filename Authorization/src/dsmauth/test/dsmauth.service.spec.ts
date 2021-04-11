import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../shared/user/entity/user.entity";
import { DsmauthController } from "../dsmauth.controller";
import { DsmauthService } from "../dsmauth.service";
import { UserService } from "../../shared/user/user.service";

class MockUserRepository {
  public findOne({ where: { identity } }) {}
}

class MockUserService {
  public findByIdentity(identity: number) {}
}

describe("DsmauthService", () => {
  let service: DsmauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [
        DsmauthService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: UserService,
          useClass: MockUserService,
        },
      ],
      controllers: [DsmauthController],
    }).compile();

    service = module.get<DsmauthService>(DsmauthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
