import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../shared/user/entity/user.entity";
import { Consumer } from "../../consumer/entity/consumer.entity";
import { AppService } from "../app.service";
import { REQUEST } from "@nestjs/core";
import { MockConsumerRepository } from "../../shared/mock/consumer.mock";
import { MockUserRepository } from "../../shared/mock/user.mock";
import { MockRequest } from "../../shared/mock/request.mock";

describe("AppService", () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
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
    }).compile();

    service = await module.resolve<AppService>(AppService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("myService", () => {
    it("should be return consumer array", () => {
      service.myService().then((res) => {
        expect(res).toBeInstanceOf(Array);
        expect(res[0].name).toEqual("ddyzd");
        expect(res[0].domain_url).toEqual("ddyzd.com");

        expect(res[1].name).toEqual("auth");
        expect(res[1].domain_url).toEqual("dsmauth.com");
      });
    });
  });
});
