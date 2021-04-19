export class MockJwtSrvice {
  public sign({ client_id, user_identity, type }) {
    return `${type}token with ${client_id} ${user_identity}`;
  }
}
