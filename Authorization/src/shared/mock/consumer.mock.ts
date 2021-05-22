import { urlDto } from "../../consumer/dto/url.dto";
import { RegistrationDto } from "../../consumer/dto/registration.dto";
import { User } from "../user/entity/user.entity";
import { consumers, consumersList } from "./dummy/consumer.dummy";
import { notFoundConsumerException } from "../exception/exception.index";
import { Consumer } from "../../consumer/entity/consumer.entity";

export class MockConsumerRepository {
  public registration(dto: RegistrationDto, user: User) {
    const client_id: string = "testuuid";
    const client_secret: string = "testuuid";

    console.log(`dto: ${JSON.stringify(dto)}`);
    console.log(`user: ${JSON.stringify(user)}`);
    return { client_id, client_secret };
  }

  public findNameAndDomainUrl() {
    return consumersList;
  }

  public myService(userId: number) {
    console.log(
      `myservice:
        -> user: ${userId},
        -> consumers:
        ${JSON.stringify(consumers[0])},
        ${JSON.stringify(consumers[1])}`,
    );

    return consumers;
  }

  public findOne(args: any) {
    if (!args) {
      return new Consumer();
    } else if (args.client_id) {
      return new Consumer();
    } else {
      if (args.where.client_id === "exist_client_id") {
        const consumer: Consumer = new Consumer();
        consumer.client_secret = "right_client_secret";
        return consumer;
      }
    }
  }

  public async getConsumerByRedirectUrl(
    client_id: string,
    redirect_url: string,
  ) {
    if (
      client_id === "exist_client_id" &&
      redirect_url === "http://test.redirecturl.com"
    ) {
      return new Consumer();
    }
  }
}

export class MockConsumerService {
  public async registrateConsumer(dto: RegistrationDto) {
    const user = this.getUser();
    console.log(`dto: ${JSON.stringify(dto)}`);
    console.log(`user: ${JSON.stringify(user)}`);

    const client_id = "testuuid";
    const client_secret = "testuuid";
    return { client_id, client_secret };
  }

  public async getConsumerCatalog() {
    return consumersList;
  }

  public async addConsumerRedirectUrl(dto: urlDto) {
    if (dto.client_id !== "testuuid") {
      throw notFoundConsumerException;
    }
  }

  private async getUser() {
    const user = new User();
    user.identity = "testIdentity";
    return user;
  }
}
