import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserReqeust } from "../shared/user/interface/user-request.interface";
import { Consumer } from "../consumer/entity/consumer.entity";
import { ConsumerRepository } from "../consumer/entity/consumer.repository";
import { notFoundUserException } from "../shared/exception/exception.index";
import { User } from "../shared/user/entity/user.entity";
import { UserRepository } from "../shared/user/entity/user.repository";

@Injectable({ scope: Scope.REQUEST })
export class AppService {
  constructor(
    @InjectRepository(Consumer)
    private readonly consumerRepository: ConsumerRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @Inject(REQUEST) private request: IUserReqeust,
  ) {}

  public async myService(): Promise<Consumer[]> {
    const user: User = await this.userRepository.findByRequest(
      this.request.user,
    );
    if (!user) {
      throw notFoundUserException;
    }
    const consumers: Consumer[] = await this.consumerRepository.myService(
      user.id,
    );
    return consumers.map((consumer: Consumer) => {
      const deserializeUrl: string = consumer.redirect_url as string;
      consumer.redirect_url = deserializeUrl.split(",");
      return consumer;
    });
  }
}
