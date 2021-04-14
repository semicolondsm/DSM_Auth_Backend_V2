import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../../shared/user/entity/user.entity";
import { ConsumerController } from "../consumer.controller";
import { ConsumerService } from "../consumer.service";
import {
  RegistrationDto,
  RegistrationResponseData,
} from "../dto/registration.dto";

class MockConsumerService {
  public async registration(
    dto: RegistrationDto,
  ): Promise<RegistrationResponseData> {
    const user = await this.getUser();
    console.log(`dto: ${JSON.stringify(dto)}`);
    console.log(`user: ${JSON.stringify(user)}`);

    const client_id = "testuuid";
    const client_secret = "testuuid";
    return { client_id, client_secret };
  }

  public async list() {
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

  private async getUser(): Promise<User> {
    const user = new User();
    user.identity = "testIdentity";
    return user;
  }
}

describe("ConsumerController", () => {
  let controller: ConsumerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConsumerService,
          useClass: MockConsumerService,
        },
      ],
      controllers: [ConsumerController],
    }).compile();

    controller = module.get<ConsumerController>(ConsumerController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("registration", () => {
    const dto = {
      consumer: "testSite",
      domain_url: "test.com",
      redirect_url: "test123.com",
    };
    it("should be return client_id, client_secret", () => {
      controller.registration(dto).then((res) => {
        expect(res).toBeInstanceOf(Object);
        expect(res.client_id).toEqual("testuuid");
        expect(res.client_secret).toEqual("testuuid");
      });
    });
  });

  describe("list", () => {
    it("should be return consumer array", () => {
      controller.list().then((res) => {
        expect(res).toBeInstanceOf(Array);
        expect(res[0].name).toEqual("naver");
        expect(res[0].domain_url).toEqual("naver.com");

        expect(res[1].name).toEqual("google");
        expect(res[1].domain_url).toEqual("google.com");
      });
    });
  });
});
