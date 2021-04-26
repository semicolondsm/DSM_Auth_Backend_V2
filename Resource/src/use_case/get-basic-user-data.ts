import { User } from "../domain/user/user";
import { UserRepository } from "../domain/user/user.repository";

export class GetBasicUserData {
  constructor(private readonly userRepository: UserRepository) {}

  public execute(identity: string): Promise<User> {
    return this.userRepository.findOne(identity);
  }
}
