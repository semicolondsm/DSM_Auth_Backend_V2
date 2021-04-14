import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../shared/user/entity/user.entity";
import { ConsumerController } from "../consumer.controller";
import { ConsumerService } from "../consumer.service";
import { Consumer } from "../entity/consumer.entity";
import { RegistrationDto } from "../dto/registration.dto";
import { REQUEST } from "@nestjs/core";

class MockConsumerRepository {
  public registration(dto: RegistrationDto, user: User) {
    const client_id: string = "testuuid";
    const client_secret: string = "testuuid";

    console.log(`dto: ${JSON.stringify(dto)}`);
    console.log(`user: ${JSON.stringify(user)}`);
    return { client_id, client_secret };
  }

  public list() {
    const consumers = [
      {
        name: "naver",
        domain_url: "naver.com",
      },
      {
        name: "google",
        domain_url: "google.com",
      },
    ];

    return consumers;
  }
}

class MockUserRepository {
  public async findOne({ identity }) {
    let user = new User();
    user.identity = "testIdentity";

    if (identity === "testIdentity") {
      return user;
    } else {
      console.log(identity);
    }
  }
}

class MockRequest {
  public user = {
    user_identity: "testIdentity",
  };
}

describe("ConsumerService", () => {
  let service: ConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumerService,
        {
          provide: getRepositoryToken(Consumer),
          useClass: MockConsumerRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: REQUEST,
          useClass: MockRequest,
        },
      ],
      controllers: [ConsumerController],
    }).compile();

    service = await module.resolve<ConsumerService>(ConsumerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("registration", () => {
    const dto = {
      consumer: "testSite",
      domain_url: "test.com",
      redirect_url: "test123.com",
    };
    it("should be sucess", () => {
      service.registration(dto).then((res) => {
        expect(res).toBeInstanceOf(Object);
        expect(res.client_id).toEqual("testuuid");
        expect(res.client_secret).toEqual("testuuid");
      });
    });
  });

  describe("list", () => {
    it("should be return consumer array", () => {
      service.list().then((res) => {
        expect(res).toBeInstanceOf(Array);
        expect(res[0].name).toEqual("naver");
        expect(res[0].domain_url).toEqual("naver.com");

        expect(res[1].name).toEqual("google");
        expect(res[1].domain_url).toEqual("google.com");
      });
    });
  });
});
