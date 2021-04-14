import { IJwtPayload } from "src/shared/jwt/interface/jwt-payload.interface";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async checkExist(identity: string): Promise<boolean> {
    const user = await this.createQueryBuilder("user")
      .select("user.identity")
      .where("user.identity = :identity", { identity })
      .getOne();
    if (user) {
      return true;
    }
    return false;
  }

  public findByNameAndEmail(name: string, email: string): Promise<User> {
    return this.createQueryBuilder("user")
      .where("user.name = :name", { name })
      .andWhere("user.email = :email", { email })
      .getOne();
  }

  public findByRequest(payload: IJwtPayload): Promise<User> {
    return this.createQueryBuilder("user")
      .where("user.identity = :identity", {
        identity: payload.user_identity,
      })
      .getOne();
  }
}
