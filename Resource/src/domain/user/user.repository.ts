import { User } from "./user";

export interface UserRepository {
  findOne(identity: string): Promise<User>;
}
