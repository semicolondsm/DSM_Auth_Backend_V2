import { EntityRepository, Repository } from "typeorm";
import { Consumer } from "../../consumer/entity/consumer.entity";
import { Redirect } from "./redirect.entity";

@EntityRepository(Redirect)
export class RedirectRepository extends Repository<Redirect> {
  public async url(redirect_url: string, consumer: Consumer) {
    return await this.save({
      consumer,
      redirect_url,
    });
  }
}
