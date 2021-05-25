import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ConsumerService } from "../consumer.service";
import { Consumer } from "../entity/consumer.entity";
import { MockConsumerRepository } from "../../shared/mock/consumer.mock";
import { MockUserService } from "../../shared/mock/user.mock";
import { RedirectService } from "../../redirect/redirect.service";
import { MockRedirectService } from "../../shared/mock/redirect.mock";
import { UserService } from "../../shared/user/user.service";
import { Connection } from "typeorm";

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
          provide: UserService,
          useClass: MockUserService,
        },
        {
          provide: RedirectService,
          useClass: MockRedirectService,
        },
        {
          provide: Connection,
          useClass: Object,
        },
      ],
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
    it.todo("shoudl throw notFoundUserException");
    it.todo("should throw internalServerErrorException");
    it.todo("should success");
  });

  describe("list", () => {
    it("should be return consumer array", () => {
      service.getConsumerCatalog().then((res) => {
        expect(res).toBeInstanceOf(Array);
        expect(res[0].name).toEqual("naver");
        expect(res[0].domain_url).toEqual("naver.com");

        expect(res[1].name).toEqual("google");
        expect(res[1].domain_url).toEqual("google.com");
      });
    });
  });
});
