export class MockConnection {
  private queryRunner = {
    connect: jest.fn(() => Promise.resolve()),
    startTransaction: jest.fn(() => Promise.resolve()),
  };

  public createQueryRunner = jest.fn(() => this.queryRunner);
}
