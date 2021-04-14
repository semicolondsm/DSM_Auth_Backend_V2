import { consumers } from "./dummy/consumer.dummy";

export class MockAppService {
  public myService() {
    console.log(
      `myservice: ${JSON.stringify(consumers[0])},
         ${JSON.stringify(consumers[1])}`,
    );

    return consumers;
  }
}
