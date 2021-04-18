import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import {
  badRequestException,
  unauthorizedPasswordException,
} from "../../shared/exception/exception.index";
import { Consumer } from "../../consumer/entity/consumer.entity";
import { MockConsumerRepository } from "../../shared/mock/consumer.mock";
import {
  MockUserRepository,
  MockUserService,
} from "../../shared/mock/user.mock";
import { User } from "../../shared/user/entity/user.entity";
import { UserService } from "../../shared/user/user.service";
import { DsmauthController } from "../dsmauth.controller";
import { DsmauthService } from "../dsmauth.service";
import { DsmauthLoginDto } from "../dto/dsmauth-login.dto";
import { MockDsmauthService } from "../../shared/mock/dsmauth.mock";

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
          provide: getRepositoryToken(Consumer),
          useClass: MockConsumerRepository,
        },
        {
          provide: UserService,
          useClass: MockUserService,
        },
        {
          provide: DsmauthService,
          useClass: MockDsmauthService,
        },
      ],
      controllers: [DsmauthController],
    }).compile();

    controller = await module.resolve<DsmauthController>(DsmauthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("login", () => {
    const body: DsmauthLoginDto = {
      client_id: "exist_client_id",
      redirect_url: "http://test.redirecturl.com",
      id: "existId",
      password: "rightPassword",
    };
    it("should throw unauthorized password error because not exist user", () => {
      expect(controller.login({ ...body, id: "zalgo" })).rejects.toEqual(unauthorizedPasswordException);
    });
    it("should throw unauthorized password error because", () => {
      expect(controller.login({ ...body, password: "zalgo" })).rejects.toEqual(unauthorizedPasswordException);
    });
    it("should throw bas request error because not match client_id", () => {
      expect(controller.login({ ...body, client_id: "zalgo" })).rejects.toEqual(badRequestException);
    });
    it("should throw bas request error because not match redirect_url", () => {
      expect(controller.login({ ...body, redirect_url: "zalgo" }),).rejects.toEqual(badRequestException);
    });
    it("should success", () => {
      expect(controller.login(body)).resolves.toEqual({
        location: "http://test.redirecturl.com?code=redirect_code",
      });
    });
  });
});
