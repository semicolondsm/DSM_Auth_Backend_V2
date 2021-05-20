import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserReqeust } from "../shared/user/interface/user-request.interface";
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
import { RedirectService } from "../redirect/redirect.service";

@Injectable({ scope: Scope.REQUEST })
export class ConsumerService {
  constructor(
    @Inject(REQUEST)
    private request: IUserReqeust,
    private readonly userRepository: UserRepository,
    private readonly consumerRepository: ConsumerRepository,
    private readonly redirectService: RedirectService,
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
    await this.addConsumerRedirectUrl({
      client_id: consumerRecord.client_id,
      redirect_url: dto.redirect_url,
    });
    return consumerRecord;
  }

  public async list(): Promise<Consumer[]> {
    return this.consumerRepository.list();
  }

  public async addConsumerRedirectUrl(dto: urlDto) {
    const consumer = await this.consumerRepository.findOne({
      client_id: dto.client_id,
    });
    if (!consumer) {
      throw notFoundConsumerException;
    }
    await this.redirectService.createNewRedirectUrl(dto.redirect_url, consumer);
  }
}
