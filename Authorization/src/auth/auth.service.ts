import { Injectable, Logger } from "@nestjs/common";
import { asyncFuncRedisGet, asyncFuncRedisSet } from "../redis.client";
import { User } from "../shared/user/entity/user.entity";
import {
  alreadySignupException,
  badRequestException,
  notAllowedIDException,
  notFoundEmailException,
  unauthorizedCodeException,
} from "../shared/exception/exception.index";
import { sendMail } from "../shared/mail/mail.transport";
import { UserRepository } from "../shared/user/entity/user.repository";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async checkAllowedId(identity: string) {
    if (await this.userRepository.checkExist(identity)) {
      throw notAllowedIDException;
    }
  }

  public async emailAuthentication(email: string) {
    const existUser: User = await this.userRepository.findOne({
      where: { email },
    });
    if (!existUser) {
      throw notFoundEmailException;
    }
    if (existUser.password) {
      throw alreadySignupException;
    }
    const authNum: string = Math.floor(Math.random() * 1000000).toString();
    this.setAuthNumberForEamil(email, authNum);
    this.sendEmailWithAuthNumber(email, authNum);
  }

  public async userSignUp({ name, email, authcode, id, password }: SignUpDto) {
    const storedData: string = await asyncFuncRedisGet(email);
    if (!storedData || storedData !== authcode) {
      throw unauthorizedCodeException;
    }
    const getUserPromise: Promise<User> = this.userRepository.findByNameAndEmail(
      name,
      email,
    );
    const hashPasswordPromise: Promise<string> = bcrypt.hash(password, 12);
    const exUser = await getUserPromise;
    if (!exUser) {
      throw notFoundEmailException;
    }
    if (exUser.password) {
      throw alreadySignupException;
    }
    await this.userRepository.save({
      ...exUser,
      identity: id,
      password: await hashPasswordPromise,
    });
  }

  public async setAuthNumberForEamil(email: string, authNum: string) {
    try {
      await asyncFuncRedisSet(email, authNum, "EX", 60 * 5);
    } catch (err) {
      Logger.error(err);
    }
  }

  public async sendEmailWithAuthNumber(email: string, authNum: string) {
    try {
      const result = await sendMail(email, authNum);
      Logger.log(result);
    } catch (err) {
      Logger.error(err);
    }
  }
}
