import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async checkExist(identity: string): Promise<boolean> {
    const user = this.createQueryBuilder("user")
      .select("user.identity")
      .where("user.identity = :identity", { identity })
      .getOne();
    if (user) {
      return true;
    }
    return false;
  }
}
