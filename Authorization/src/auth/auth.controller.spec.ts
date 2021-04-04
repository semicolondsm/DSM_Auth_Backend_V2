import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../shared/user/entity/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

class MockRepository {
  public async findOne(id: string): Promise<User> {
    if (id === "tester") {
      throw new User();
    } else {
      return undefined;
    }
  }
}

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
