import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import {
  MockUserRepository,
  MockUserService,
} from "../../shared/mock/user.mock";
import { User } from "../../shared/user/entity/user.entity";
import { UserService } from "../../shared/user/user.service";
import { DsmauthController } from "../dsmauth.controller";
import { DsmauthService } from "../dsmauth.service";

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

    controller = await module.resolve<DsmauthController>(DsmauthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
