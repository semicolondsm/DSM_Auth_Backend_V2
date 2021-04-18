import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import {
  notFoundConsumerException,
  notFoundUserException,
} from "../shared/exception/exception.index";
import { User } from "../shared/user/entity/user.entity";
import { UserRepository } from "../shared/user/entity/user.repository";
import {
  RegistrationDto,
  RegistrationResponseData,
} from "./dto/registration.dto";
import { urlDto } from "./dto/url.dto";
import { Consumer } from "./entity/consumer.entity";
import { ConsumerRepository } from "./entity/consumer.repository";
import { Redirect } from "./entity/redirect.entity";
import { RedirectRepository } from "./entity/redirect.repository";

@Injectable({ scope: Scope.REQUEST })
export class ConsumerService {
  constructor(
    @InjectRepository(Consumer)
    private readonly consumerRepository: ConsumerRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(Redirect)
    private readonly redirectRepository: RedirectRepository,
    @Inject(REQUEST) private request,
  ) {}

  public async registration(
    dto: RegistrationDto,
  ): Promise<RegistrationResponseData> {
    const user: User = await this.userRepository.findByRequest(
      this.request.user,
    );
    if (!user) {
      throw notFoundUserException;
    }

    const consumerRecord = await this.consumerRepository.registration(
      dto,
      user,
    );
    await this.url({
      client_id: consumerRecord.client_id,
      redirect_url: dto.redirect_url,
    });
    return consumerRecord;
  }

  public async list(): Promise<Consumer[]> {
    return this.consumerRepository.list();
  }

  public async url(dto: urlDto) {
    const consumer = await this.consumerRepository.findOne({
      client_id: dto.client_id,
    });
    if (!consumer) {
      throw notFoundConsumerException;
    }

    return await this.redirectRepository.url(dto.redirect_url, consumer);
  }
}
