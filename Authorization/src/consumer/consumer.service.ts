import { Injectable } from "@nestjs/common";
import {
  notFoundConsumerException,
  notFoundUserException,
} from "../shared/exception/exception.index";
import { User } from "../shared/user/entity/user.entity";
import {
  RegistrationDto,
  RegistrationResponseData,
} from "./dto/registration.dto";
import { urlDto } from "./dto/url.dto";
import { Consumer } from "./entity/consumer.entity";
import { ConsumerRepository } from "./entity/consumer.repository";
import { RedirectService } from "../redirect/redirect.service";
import { UserService } from "../shared/user/user.service";

@Injectable()
export class ConsumerService {
  constructor(
    private readonly consumerRepository: ConsumerRepository,
    private readonly userServie: UserService,
    private readonly redirectService: RedirectService,
  ) {}

  public async registration(
    dto: RegistrationDto,
    user_identity: string
  ): Promise<RegistrationResponseData> {
    const user: User = await this.userServie.findByIdentity(user_identity);
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
