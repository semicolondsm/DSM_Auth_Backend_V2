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
      user,
      client_id,
      client_secret,
      name: dto.consumer,
      domain_url: dto.domain_url,
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
      .select("GROUP_CONCAT(redirect.redirect_url)", "redirect_url")
      .addSelect("consumer.name", "name")
      .addSelect("consumer.domain_url", "domain_url")
      .addSelect("consumer.client_id", "client_id")
      .addSelect("consumer.client_secret", "client_secret")
      .innerJoin("consumer.user", "user")
      .innerJoin("consumer.redirects", "redirect")
      .where("user.id = :userId", { userId })
      .groupBy("consumer.id")
      .getRawMany();
  }
}
