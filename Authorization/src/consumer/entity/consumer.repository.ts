import { User } from "src/shared/user/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { v4 } from "uuid";
import {
  RegistrationDto,
  RegistrationResponseData,
} from "../dto/registration.dto";
import { Consumers } from "./consumer.entity";

@EntityRepository(Consumers)
export class ConsumersRepository extends Repository<Consumers> {
  public async registration(
    dto: RegistrationDto,
    user: User,
  ): Promise<RegistrationResponseData> {
    let newConsumers: Consumers;
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
}
