import { EntityRepository, Repository } from "typeorm";
import { Consumer } from "./consumer.entity";

@EntityRepository(Consumer)
export class ConsumerRepository extends Repository<Consumer> {
  public findNameAndDomainUrl(): Promise<Consumer[]> {
    return this.createQueryBuilder("consumer")
      .select("consumer.name")
      .addSelect("consumer.domain_url")
      .getMany();
  }

  public myService(userId: number): Promise<Consumer[]> {
    return this.createQueryBuilder("consumer")
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

  public getConsumerByRedirectUrl(
    client_id: string,
    redirect_url: string,
  ): Promise<Consumer> {
    return this.createQueryBuilder("consumer")
      .select("consumer.id")
      .leftJoin("consumer.redirects", "redirects")
      .where("consumer.client_id = :client_id", { client_id })
      .andWhere("redirects.redirect_url = :redirect_url", { redirect_url })
      .getOne();
  }
}
