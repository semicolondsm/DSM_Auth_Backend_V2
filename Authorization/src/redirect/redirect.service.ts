import { Injectable } from "@nestjs/common";
import { Consumer } from "../consumer/entity/consumer.entity";
import { RedirectRepository } from "./entity/redirect.repository";

@Injectable()
export class RedirectService {
  constructor(private readonly redirectRepository: RedirectRepository) {}

  public createNewRedirectUrl(redirect_url: string, consumer: Consumer) {
    return this.redirectRepository.save({
      consumer,
      redirect_url,
    });
  }
}
