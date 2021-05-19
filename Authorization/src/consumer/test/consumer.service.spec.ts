import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../shared/user/entity/user.entity";
import { ConsumerService } from "../consumer.service";
import { Consumer } from "../entity/consumer.entity";
import { REQUEST } from "@nestjs/core";
import { MockConsumerRepository } from "../../shared/mock/consumer.mock";
import { MockUserRepository } from "../../shared/mock/user.mock";
import { MockRequest } from "../../shared/mock/request.mock";
import { RedirectService } from "../../redirect/redirect.service";
import { MockRedirectService } from "../../shared/mock/redirect.mock";

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
          provide: RedirectService,
          useClass: MockRedirectService,
        },
        {
          provide: REQUEST,
          useClass: MockRequest,
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
