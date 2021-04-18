import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../shared/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import {
  ACCESS_TOKEN_EXPIRED_TIME,
  JWT_SECRET_KEY,
} from "../shared/jwt/jwt.constant";
import { DsmauthLoginDto } from "./dto/dsmauth-login.dto";
import { IJwtPayload } from "../shared/jwt/interface/jwt-payload.interface";
import { DsmauthProvideTokenDto } from "./dto/dsmauth-token.dto";
import { User } from "../shared/user/entity/user.entity";
import { Consumer } from "../consumer/entity/consumer.entity";
import { ConsumerRepository } from "../consumer/entity/consumer.repository";
import {
  badRequestException,
  unauthorizedPasswordException,
} from "../shared/exception/exception.index";
import { v4 } from "uuid";
import { asyncFuncRedisSet } from "../shared/redis/redis.client";

@Injectable()
export class DsmauthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly consumerRepository: ConsumerRepository,
  ) {}

  public async login({
    client_id,
    redirect_url,
    id,
    password,
  }: DsmauthLoginDto) {
    const checkExistUserPromise: Promise<User> = this.userService.findByIdentity(
      id,
    );
    const checkExistConsumerPromise: Promise<Consumer> = this.consumerRepository.getConsumerByRedirectUrl(
      client_id,
      redirect_url,
    );
    const exUser: User = await checkExistUserPromise;
    const exConsumer: Consumer = await checkExistConsumerPromise;
    if (!exUser || !(await bcrypt.compare(password, exUser.password))) {
      throw unauthorizedPasswordException;
    }
    if (!exConsumer) {
      throw badRequestException;
    }
    const code: string = v4();
    this.setUserIdentityForRedis(code, exUser.identity);
    return {
      location: `${redirect_url}?code=${code}`,
    };
  }

  public async provideToken({
    client_id,
    client_secret,
    code,
  }: DsmauthProvideTokenDto) {}

  public async refreshToken({ user_identity, client_id }: IJwtPayload) {}

  public async validationUser(identity: string, password: string) {
    const user = await this.userService.findByIdentity(identity);
    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    }
    return false;
  }

  private async setUserIdentityForRedis(code: string, user_identity: string) {
    try {
      await asyncFuncRedisSet(code, user_identity!, "EX", 90);
    } catch (err) {
      Logger.error(err);
    }
  }
}
