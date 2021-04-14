import { IJwtPayload } from "../jwt/interface/jwt-payload.interface";
import { User } from "../user/entity/user.entity";

export class MockUserRepository {
  public findByRequest(payload: IJwtPayload) {
    let user = new User();
    user.id = 123;
    user.identity = "testIdentity";

    if (payload.user_identity === "testIdentity") {
      return user;
    } else {
      return undefined;
    }
  }
}
