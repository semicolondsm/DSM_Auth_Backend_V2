import { Consumer } from "../../consumer/entity/consumer.entity";

export class MockRedirectService {
  public createNewRedirectUrl(redirect_url: string, consumer: Consumer) {
    expect(redirect_url).toEqual("test123.com");
    expect(consumer).toBeInstanceOf(Consumer);
  }
}
