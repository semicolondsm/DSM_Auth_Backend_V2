import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../shared/user/entity/user.entity";
import { UserService } from "../../shared/user/user.service";
import { DsmauthController } from "../dsmauth.controller";
import { DsmauthService } from "../dsmauth.service";

class MockUserRepository {
  public findOne({ where: { identity } }) {}
}

class MockUserService {
  public findByIdentity(identity: number) {}
}

describe("DsmauthController", () => {
  let controller: DsmauthController;

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

    controller = module.get<DsmauthController>(DsmauthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
