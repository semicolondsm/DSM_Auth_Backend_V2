import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../domain/user/user";
import { Repository } from "typeorm";
import { UserRepository } from "../../domain/user/user.repository";
import { UserEntity } from "./entity/user.entity";

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findOne(identity: string): Promise<User> {
    const foundUserEntity: UserEntity = await this.userRepository
      .createQueryBuilder("user")
      .select("user.name")
      .addSelect("user.email")
      .addSelect("user.gcn")
      .where("user.identity = :identity", { identity })
      .getOne();

    return this.toUser(foundUserEntity);
  }

  private toUser(userEntity: UserEntity): User {
    return new User(userEntity);
  }
}
