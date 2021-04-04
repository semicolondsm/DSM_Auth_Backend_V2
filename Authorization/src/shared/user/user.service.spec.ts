import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";

class MockRepository {
  public async findOne(user_id: number): Promise<User> {
    if (user_id === 1) {
      return new User();
    } else {
      return undefined;
    }
  }
}

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findById", () => {
    it("should exists", () => {
      service
        .findById(1)
        .then((user) => expect(user).toBeInstanceOf(User))
        .catch(() => expect(1).toEqual(2));
    });

    it("should not exists", () => {
      service
        .findById(2)
        .then((user) => expect(user).toBeUndefined())
        .catch(() => expect(1).toEqual(2));
    });
  });
});
