import { Injectable, Logger } from "@nestjs/common";
import { asyncFuncRedisSet } from "../redis.client";
import { User } from "../shared/user/entity/user.entity";
import {
  alreadySignupException,
  notAllowedIDException,
  notFoundEmailException,
} from "../shared/exception/exception.index";
import { UserRepository } from "../shared/user/entity/user.repository";
import { sendMail } from "../shared/mail/mail.transport";

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

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

  private async setAuthNumberForEamil(email: string, authNum: string) {
    try {
      await asyncFuncRedisSet(email, authNum);
    } catch (err) {
      Logger.error(err);
    }
  }

  private async sendEmailWithAuthNumber(email: string, authNum: string) {
    try {
      const result = await sendMail(email, authNum);
      Logger.log(result);
    } catch (err) {
      Logger.error(err);
    }
  }
}
