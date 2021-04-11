import { User } from "src/shared/user/entity/user.entity";
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
    let newConsumer: Consumer;
    const client_id: string = v4().replace(/-/g, "");
    const client_secret: string = v4().replace(/-/g, "");

    newConsumer = this.create({
      name: dto.consumer,
      user: user,
      client_id,
      client_secret,
      ...dto,
    });
    await this.save(newConsumer);

    return { client_id, client_secret };
  }
}
