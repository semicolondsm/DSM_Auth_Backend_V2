import { EntityRepository, Repository } from "typeorm";
import { Consumer } from "./consumer.entity";
import { Redirect } from "./redirect.entity";

@EntityRepository(Redirect)
export class RedirectRepository extends Repository<Redirect> {
  public async url(redirect_url: string, consumer: Consumer) {
    let newRedirect: Redirect;
    newRedirect = this.create({
      consumer,
      redirect_url,
    });

    return await this.save(newRedirect);
  }
}
