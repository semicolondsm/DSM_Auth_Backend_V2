import { Injectable } from "@nestjs/common";
import { notAllowedIDException } from "../shared/exception/exception.index";
import { UserRepository } from "../shared/user/entity/user.repository";

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async checkAllowedId(identity: string) {
    if (await this.userRepository.findOne({ where: { identity } })) {
      throw notAllowedIDException;
    }
  }
}
