import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import {
  alreadySignupException,
  notFoundEmailException,
  unauthorizedCodeException,
} from "../../shared/exception/exception.index";
import { User } from "../../shared/user/entity/user.entity";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { SignUpDto } from "../dto/sign-up.dto";

class MockRepository {
  public async checkExist(identity: string): Promise<boolean> {
    if (identity === "tester") {
      return true;
    } else {
      return false;
    }
  }

  public async findOne({ where: { email } }): Promise<User> {
    if (email === "201216jjw@dsm.hs.kr") {
      return new User();
    } else if (email === "alreadysignupeamil@dsm.hs.kr") {
      const user = new User();
      user.password = "exist";
      return user;
    } else {
      undefined;
    }
  }

  public async findByNameAndEmail(name: string, email: string): Promise<User> {
    if (email === "rightKey") {
      const user = new User();
      if (name === "tester") {
        return user;
      } else if (name === "signedTester") {
        user.password = "alreadySignupPassword";
        return user;
      }
    } else {
      return undefined;
    }
  }

  public async save(user: SignUpDto) {
    expect(user).toEqual({ identity: "id", password: "hashedpassword" });
  }
}

jest.mock("../../shared/mail/mail.transport", () => ({
  sendMail(email: string, authNum: string) {
    console.log(`send to email to ${email} with ${authNum}`);
  },
}));

jest.mock("../../redis.client", () => ({
  asyncFuncRedisSet(email: string, authNum: string) {
    console.log(`save for to ${email} with ${authNum}`);
  },

  async asyncFuncRedisGet(email: string): Promise<string> {
    if (email === "rightKey") {
      return "rightValue";
    }
    console.log("return undefined value");
  },
}));

jest.mock("bcrypt", () => ({
  async hash(data: string, round: number): Promise<string> {
    return "hashed" + data;
  },
}));

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
      controllers: [AuthController],
    }).compile();

    service = await module.resolve<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("checkAllowedId", () => {
    it("should not allowed id", () => {
      service.checkAllowedId("tester").catch((err) => {
        expect(err.message).toEqual("Not Allowed ID");
        expect(err.getStatus()).toEqual(405);
      });
    });

    it("should allowed id", () => {
      expect(service.checkAllowedId("not tester")).resolves.toBeUndefined();
    });
  });

  describe("emailAuthentication", () => {
    it("should throw not fount email error", () => {
      const spyFnRedis = jest.spyOn(service, "setAuthNumberForEamil");
      const spyFnEmail = jest.spyOn(service, "sendEmailWithAuthNumber");
      service.emailAuthentication("1234").catch((err) => {
        expect(err.getStatus()).toEqual(404);
        expect(err.message).toEqual("Not Found Email");
        expect(spyFnEmail).toBeCalledTimes(0);
        expect(spyFnRedis).toBeCalledTimes(0);
      });
    });

    it("should throw already signup error", () => {
      const spyFnRedis = jest.spyOn(service, "setAuthNumberForEamil");
      const spyFnEmail = jest.spyOn(service, "sendEmailWithAuthNumber");
      service
        .emailAuthentication("alreadysignupeamil@dsm.hs.kr")
        .catch((err) => {
          expect(err.getStatus()).toEqual(403);
          expect(err.message).toEqual("Already Signup");
          expect(spyFnEmail).toBeCalledTimes(0);
          expect(spyFnRedis).toBeCalledTimes(0);
        });
    });

    it("shoul success test", () => {
      const spyFnRedis = jest.spyOn(service, "setAuthNumberForEamil");
      const spyFnEmail = jest.spyOn(service, "sendEmailWithAuthNumber");
      service.emailAuthentication("201216jjw@dsm.hs.kr").then(() => {
        expect(spyFnEmail).toBeCalledTimes(1);
        expect(spyFnRedis).toBeCalledTimes(1);
      });
    });
  });

  describe("userSignUp", () => {
    const body: SignUpDto = {
      name: "tester",
      email: "rightKey",
      authcode: "rightValue",
      id: "id",
      password: "password",
    };
    it("should throw unauthorized code error because not exist redis value", () => {
      expect(service.userSignUp({ ...body, email: "zalgo" })).rejects.toEqual(
        unauthorizedCodeException,
      );
    });
    it("should throw unauthorized code error because not equal authcode", () => {
      expect(
        service.userSignUp({ ...body, authcode: "zalgo" }),
      ).rejects.toEqual(unauthorizedCodeException);
    });
    it("should throw not found email error", () => {
      expect(service.userSignUp({ ...body, name: "zalgo" })).rejects.toEqual(
        notFoundEmailException,
      );
    });
    it("should throw already signup error", () => {
      expect(
        service.userSignUp({ ...body, name: "signedTester" }),
      ).rejects.toEqual(alreadySignupException);
    });
    it("should success", async () => {
      await service.userSignUp(body);
    });
  });
});
