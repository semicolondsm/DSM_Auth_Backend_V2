import { Injectable } from "@nestjs/common";
import { User } from "./entity/user.entity";
import { UserRepository } from "./entity/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public findById(user_id: number): Promise<User> {
    return this.userRepository.findOne(user_id);
  }

  public findByIdentity(identity: string): Promise<User> {
    return this.userRepository.findOne({ where: { identity } });
  }
}
