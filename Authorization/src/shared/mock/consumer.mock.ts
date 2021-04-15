import { RegistrationDto } from "../../consumer/dto/registration.dto";
import { User } from "../user/entity/user.entity";
import { consumers, consumersList } from "./dummy/consumer.dummy";

export class MockConsumerRepository {
  public registration(dto: RegistrationDto, user: User) {
    const client_id: string = "testuuid";
    const client_secret: string = "testuuid";

    console.log(`dto: ${JSON.stringify(dto)}`);
    console.log(`user: ${JSON.stringify(user)}`);
    return { client_id, client_secret };
  }

  public list() {
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
}

export class MockConsumerService {
  public registration(dto: RegistrationDto) {
    const user = this.getUser();
    console.log(`dto: ${JSON.stringify(dto)}`);
    console.log(`user: ${JSON.stringify(user)}`);

    const client_id = "testuuid";
    const client_secret = "testuuid";
    return { client_id, client_secret };
  }

  public list() {
    return consumersList;
  }

  private getUser() {
    const user = new User();
    user.identity = "testIdentity";
    return user;
  }
}