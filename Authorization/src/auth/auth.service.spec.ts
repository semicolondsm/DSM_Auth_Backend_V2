import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../shared/user/entity/user.entity";
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

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("checkAllowedId", () => {
    it("should not allowed id", () => {
      service
        .checkAllowedId("tester")
        .catch((err) => expect(err.message).toEqual("Not Allowed ID"));
    });

    it("should allowed id", () => {
      service
        .checkAllowedId("not tester")
        .then(() => expect(1).toEqual(1))
        .catch(() => expect(1).toEqual(2));
    });
  });
});
