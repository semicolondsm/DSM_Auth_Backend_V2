import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../shared/user/entity/user.entity";
import { DsmauthController } from "../dsmauth.controller";
import { DsmauthService } from "../dsmauth.service";
import { UserService } from "../../shared/user/user.service";
import {
  MockUserRepository,
  MockUserService,
} from "../../shared/mock/user.mock";
import { Consumer } from "../../consumer/entity/consumer.entity";
import { MockConsumerRepository } from "../../shared/mock/consumer.mock";
import { DsmauthProvideTokenDto } from "../dto/dsmauth-token.dto";
import { DsmauthLoginDto } from "../dto/dsmauth-login.dto";
import {
  badRequestException,
  forbiddenCodeException,
  unauthorizedPasswordException,
  unauthorizedSecretKey,
} from "../../shared/exception/exception.index";
import { MockJwtSrvice } from "../../shared/mock/jwt.mock";

jest.mock("bcrypt", () => ({
  async compare(password: string, encrypted: string) {
    if (password === "rightPassword" && encrypted === "test_password") {
      return true;
    } else {
      return false;
    }
  },
}));

jest.mock("../../shared/redis/redis.client", () => ({
  asyncFuncRedisSet(code: string, user_identity: string) {
    expect(code).toEqual("redirect_code");
    expect(user_identity).toEqual("tester");
  },
  asyncFuncRedisDel(code: string) {
    expect(code).toEqual("rightCode");
  },
  asyncFuncRedisGet(code: string) {
    if (code === "rightCode") {
      return "tester";
    }
  },
}));

jest.mock("uuid", () => ({
  v4() {
    return "redirect_code";
  },
}));

describe("DsmauthService", () => {
  let service: DsmauthService;

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
          provide: UserService,
          useClass: MockUserService,
        },
        {
          provide: getRepositoryToken(Consumer),
          useClass: MockConsumerRepository,
        },
        {
          provide: JwtService,
          useClass: MockJwtSrvice,
        },
      ],
      controllers: [DsmauthController],
    }).compile();

    service = await module.resolve<DsmauthService>(DsmauthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("login", () => {
    const body: DsmauthLoginDto = {
      client_id: "exist_client_id",
      redirect_url: "http://test.redirecturl.com",
      id: "existId",
      password: "rightPassword",
    };
    it("should throw unauthorized password error because not exist user", () => {
      expect(service.login({ ...body, id: "zalgo" })).rejects.toEqual(
        unauthorizedPasswordException,
      );
    });
    it("should throw unauthorized password error because", () => {
      expect(service.login({ ...body, password: "zalgo" })).rejects.toEqual(
        unauthorizedPasswordException,
      );
    });
    it("should throw bas request error because not match client_id", () => {
      expect(service.login({ ...body, client_id: "zalgo" })).rejects.toEqual(
        badRequestException,
      );
    });
    it("should throw bas request error because not match redirect_url", () => {
      expect(service.login({ ...body, redirect_url: "zalgo" })).rejects.toEqual(
        badRequestException,
      );
    });
    it("should success", () => {
      expect(service.login(body)).resolves.toEqual({
        location: "http://test.redirecturl.com?code=redirect_code",
      });
    });
  });

  describe("provideToken", () => {
    const body: DsmauthProvideTokenDto = {
      client_id: "exist_client_id",
      client_secret: "right_client_secret",
      code: "rightCode",
    };
    it("should throw unauthorized secret key error because not exist consumer", () => {
      expect(
        service.provideToken({ ...body, client_id: "zalgo" }),
      ).rejects.toEqual(unauthorizedSecretKey);
    });
    it("should throw unauthorized secret key error because not match client secret", () => {
      expect(
        service.provideToken({ ...body, client_secret: "zalgo" }),
      ).rejects.toEqual(unauthorizedSecretKey);
    });
    it("should throw forbidden code error", () => {
      expect(service.provideToken({ ...body, code: "zalgo" })).rejects.toEqual(
        forbiddenCodeException,
      );
    });
    it("should return token", () => {
      expect(service.provideToken(body)).resolves.toEqual({
        access_token: "accesstoken with exist_client_id tester",
        refresh_token: "refreshtoken with exist_client_id tester",
      });
    });
  });

  describe("refreshToken", () => {
    it("should return refresh token", () => {
      expect(
        service.refreshToken({
          user_identity: "tester",
          client_id: "retreshToken",
          type: "refresh",
        }),
      ).resolves.toEqual({
        access_token: "accesstoken with retreshToken tester",
      });
    });
  });
});
