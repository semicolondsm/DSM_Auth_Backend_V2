import { Injectable } from "@nestjs/common";
import { EntityManager, TransactionManager } from "typeorm";
import { Consumer } from "../consumer/entity/consumer.entity";
import { Redirect } from "./entity/redirect.entity";

@Injectable()
export class RedirectService {
  constructor() {}

  public createNewRedirectUrl(
    @TransactionManager() manager: EntityManager,
    redirect_url: string,
    consumer: Consumer,
  ) {
    return manager.save(Redirect, { redirect_url, consumer });
  }
}
