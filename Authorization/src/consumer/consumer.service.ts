import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { notFoundUserException } from "../shared/exception/exception.index";
import { IJwtPayload } from "../shared/jwt/interface/jwt-payload.interface";
import { User } from "../shared/user/entity/user.entity";
import { UserRepository } from "../shared/user/entity/user.repository";
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
    return await this.consumerRepository.registration(dto, user);
  }

  public async list(): Promise<Consumer[]> {
    return await this.consumerRepository.list();
  }

  private async getUser(): Promise<User> {
    const payload = this.request.user as IJwtPayload;
    const user = await this.userRepository.findOne({
      identity: payload.user_identity,
    });
    return user;
  }
}
