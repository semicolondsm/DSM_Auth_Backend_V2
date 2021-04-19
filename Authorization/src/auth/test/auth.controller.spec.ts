import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import {
  alreadySignupException,
  notAllowedIDException,
  notFoundEmailException,
  unauthorizedCodeException,
} from "../../shared/exception/exception.index";
import {
  MockAuthService,
  MockUserRepository,
} from "../../shared/mock/user.mock";
import { User } from "../../shared/user/entity/user.entity";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { SignUpDto } from "../dto/sign-up.dto";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = await module.resolve<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("checkAllowedId", () => {
    it("should be allowed", () => {
      expect(controller.checkAllowedId({ id: "allowId" })).resolves.toEqual({
        message: "Allowed ID",
      });
    });

    it("should be not allowed", () => {
      expect(
        controller.checkAllowedId({ id: "not allowed id" }),
      ).rejects.toEqual(notAllowedIDException);
    });
  });

  describe("emailAuthentication", () => {
    it("should throw not fount email error", () => {
      expect(
        controller.emailAuthentication({ email: "notexistemail@gmail.com" }),
      ).rejects.toEqual(notFoundEmailException);
    });
    it("should throw already signup error", () => {
      expect(
        controller.emailAuthentication({ email: "existpassword@gmail.com" }),
      ).rejects.toEqual(alreadySignupException);
    });
    it("shoul success test", () => {
      expect(
        controller.emailAuthentication({ email: "existemail@gmail.com" }),
      ).resolves.toEqual({ message: "success" });
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
    it("should throw unauthorized code error", () => {
      expect(
        controller.userSignUp({ ...body, email: "zalgo" }),
      ).rejects.toEqual(unauthorizedCodeException);
    });

    it("should throw not fount email error", () => {
      expect(controller.userSignUp({ ...body, name: "zalgo" })).rejects.toEqual(
        notFoundEmailException,
      );
    });

    it("should throw already signup error", () => {
      expect(
        controller.userSignUp({ ...body, password: "signedPassword" }),
      ).rejects.toEqual(alreadySignupException);
    });

    it("should success", () => {
      expect(controller.userSignUp(body)).resolves.toEqual({
        message: "signup successfully",
      });
    });
  });

  afterAll((done) => {
    done();
  });
});
