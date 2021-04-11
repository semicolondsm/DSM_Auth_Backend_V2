import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../shared/user/entity/user.entity";
import { ConsumerController } from "../consumer.controller";
import { ConsumerService } from "../consumer.service";
import { Consumers } from "../entity/consumer.entity";
import { RegistrationDto } from "../dto/registration.dto";

class MockConsumerRepository {
  public async registration(
    dto: RegistrationDto,
    user: User,
  ) {

  }
}

class MockUserRepository {
  public async checkExist(identity: string) {

  }

  public async findOne() {

  }
}

describe("ConsumerService", () => {
  let service: ConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumerService,
        {
          provide: getRepositoryToken(Consumers),
          useClass: MockConsumerRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
      controllers: [ConsumerController],
    }).compile();

    service = await module.resolve<ConsumerService>(ConsumerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
