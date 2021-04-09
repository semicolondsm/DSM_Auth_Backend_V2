import { Injectable } from "@nestjs/common";
import { UserService } from "../shared/user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class DsmauthService {
  constructor(private readonly userService: UserService) {}

  public login(user) {
    return user;
  }

  public async validationUser(identity: string, password: string) {
    const user = await this.userService.findByIdentity(identity);
    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    }
    return false;
  }
}
