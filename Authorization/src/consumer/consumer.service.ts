import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
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
import { v4 } from "uuid";
import { Connection, EntityManager } from "typeorm";

@Injectable()
export class ConsumerService {
  constructor(
    private readonly consumerRepository: ConsumerRepository,
    private readonly userServie: UserService,
    private readonly redirectService: RedirectService,
    private readonly connection: Connection,
  ) {}

  public async registrateConsumer(
    { consumer: consumer_name, domain_url, redirect_url }: RegistrationDto,
    user_identity: string,
  ): Promise<RegistrationResponseData> {
    const user: User = await this.userServie.findByIdentity(user_identity);
    if (!user) {
      throw notFoundUserException;
    }
    const client_id: string = v4().replace(/-/g, "");
    const client_secret: string = v4().replace(/-/g, "");
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const consumer: Consumer = await this.createNewConsumer(
        queryRunner.manager,
        {
          user,
          client_id,
          client_secret,
          name: consumer_name,
          domain_url: domain_url,
        },
      );
      await this.redirectService.createNewRedirectUrl(
        queryRunner.manager,
        redirect_url,
        consumer,
      );
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      Logger.error(err);
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
    return { client_id, client_secret };
  }

  public async getConsumerCatalog(): Promise<Consumer[]> {
    return this.consumerRepository.findNameAndDomainUrl();
  }

  public async addConsumerRedirectUrl({ client_id, redirect_url }: urlDto) {
    const consumer = await this.consumerRepository.findOne({
      client_id: client_id,
    });
    if (!consumer) {
      throw notFoundConsumerException;
    }
    await this.redirectService.createNewRedirectUrl(
      this.connection.manager,
      redirect_url,
      consumer,
    );
  }

  private createNewConsumer(
    manager: EntityManager,
    consumer: Partial<Consumer>,
  ) {
    return manager.save(Consumer, consumer);
  }
}
