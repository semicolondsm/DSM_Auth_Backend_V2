import { User } from "../../shared/user/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { v4 } from "uuid";
import {
  RegistrationDto,
  RegistrationResponseData,
} from "../dto/registration.dto";
import { Consumer } from "./consumer.entity";

@EntityRepository(Consumer)
export class ConsumerRepository extends Repository<Consumer> {
  public async registration(
    dto: RegistrationDto,
    user: User,
  ): Promise<RegistrationResponseData> {
    let newConsumers: Consumer;
    const client_id: string = v4().replace(/-/g, "");
    const client_secret: string = v4().replace(/-/g, "");

    newConsumers = this.create({
      name: dto.consumer,
      user: user,
      client_id,
      client_secret,
      ...dto,
    });
    await this.save(newConsumers);
    return { client_id, client_secret };
  }

  public async list(): Promise<Consumer[]> {
    return await this.createQueryBuilder("consumer")
      .select("consumer.name")
      .addSelect("consumer.domain_url")
      .getMany();
  }

  public async myService(userId: number): Promise<Consumer[]> {
    return await this.createQueryBuilder("consumer")
      .innerJoin("consumer.user", "user")
      .innerJoin("consumer.redirects", "redirect")
      .select("redirect.redirect_url")
      .addSelect("consumer.name")
      .addSelect("consumer.domain_url")
      .addSelect("consumer.client_id")
      .addSelect("consumer.client_secret")
      .where("user.id = :userId", { userId })
      .getMany();
  }
}
