import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { notFoundUserException } from "src/shared/exception/exception.index";
import { IJwtPayload } from "src/shared/jwt/interface/jwt-payload.interface";
import { User } from "src/shared/user/entity/user.entity";
import { UserRepository } from "src/shared/user/entity/user.repository";
import { v4 } from "uuid";
import {
  RegistrationDto,
  RegistrationResponseData,
} from "./dto/registration.dto";
import { Consumer } from "./entity/consumer.entity";
import { ConsumerRepository } from "./entity/consumer.repository";

@Injectable({ scope: Scope.REQUEST })
export class ConsumerService {
  constructor(
    @InjectRepository(Consumer)
    private readonly consumerRepository: ConsumerRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @Inject(REQUEST) private request,
  ) {}

  public async registration(
    dto: RegistrationDto,
  ): Promise<RegistrationResponseData> {
    const user: User = await this.getUser();
    if (!user) {
      throw notFoundUserException;
    }
    return this.consumerRepository.registration(dto, user);
  }

  private async getUser(): Promise<User> {
    const payload = this.request.user as IJwtPayload;
    const user = await this.userRepository.findOne({
      identity: payload.user_identity,
    });
    return user;
  }
}
