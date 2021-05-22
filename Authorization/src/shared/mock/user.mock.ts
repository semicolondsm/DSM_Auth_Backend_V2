import { SignUpDto } from "../../auth/dto/sign-up.dto";
import {
  alreadySignupException,
  notAllowedIDException,
  notFoundEmailException,
  unauthorizedCodeException,
} from "../exception/exception.index";
import { IJwtPayload } from "../jwt/interface/jwt-payload.interface";
import { User } from "../user/entity/user.entity";

export class MockUserRepository {
  public findByRequest(payload: IJwtPayload) {
    let user = new User();
    user.id = 123;
    user.identity = "testIdentity";

    if (payload.user_identity === "testIdentity") {
      return user;
    } else {
      return undefined;
    }
  }

  public async findOne({ where: { identity } });
  public async findOne({ where: { email } }): Promise<User>;
  public async findOne(id: string): Promise<User>;

  public async findOne(args: any): Promise<User> {
    if (args.where) {
      if (args.where.email) {
        const email: string = args.where.email;
        if (email === "201216jjw@dsm.hs.kr") {
          return new User();
        } else if (email === "alreadysignupeamil@dsm.hs.kr") {
          const user = new User();
          user.password = "exist";
          return user;
        }
      }
    } else {
      if (args === "tester") {
        return new User();
      }
    }
  }

  public async checkExist(identity: string): Promise<boolean> {
    if (identity === "tester") {
      return true;
    } else {
      return false;
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
    }
  }

  public async save(user: SignUpDto) {
    expect(user).toEqual({ identity: "id", password: "hashedpassword" });
  }
}

export class MockUserService {
  public async findByIdentity(identity: string) {
    if (identity === "existId") {
      const user = new User();
      user.identity = "tester";
      user.password = "test_password";
      return user;
    }
  }
}

export class MockAuthService {
  public async checkAllowedId(id: string): Promise<void> {
    if (id !== "allowId") {
      throw notAllowedIDException;
    }
  }

  public async emailAuthentication(email: string): Promise<void> {
    switch (email) {
      case "notexistemail@gmail.com":
        throw notFoundEmailException;
      case "existpassword@gmail.com":
        throw alreadySignupException;
      default:
        return;
    }
  }

  public async userSignUp({ name, email, authcode, password }: SignUpDto) {
    if (email !== "rightKey" || authcode !== "rightValue") {
      throw unauthorizedCodeException;
    }
    if (name !== "tester") {
      throw notFoundEmailException;
    }
    if (password === "signedPassword") {
      throw alreadySignupException;
    }
  }
}
