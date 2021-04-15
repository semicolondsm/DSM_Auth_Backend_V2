import { Injectable } from "@nestjs/common";
import { UserService } from "../shared/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import {
  ACCESS_TOKEN_EXPIRED_TIME,
  JWT_SECRET_KEY,
} from "../shared/jwt/jwt.constant";
import { DsmauthLoginDto } from "./dto/dsmauth-login.dto";
import { IJwtPayload } from "../shared/jwt/interface/jwt-payload.interface";

@Injectable()
export class DsmauthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login({ client_id, redirect_url, id }: DsmauthLoginDto) {
    return {
      access_token: this.jwtService.sign(
        { user_identity: id, client_id, type: "access" },
        {
          secret: JWT_SECRET_KEY,
          expiresIn: ACCESS_TOKEN_EXPIRED_TIME,
        },
      ),
    };
  }

  public async refreshToken({ user_identity, client_id }: IJwtPayload) {}

  public async validationUser(identity: string, password: string) {
    const user = await this.userService.findByIdentity(identity);
    if (user && (await bcrypt.compare(password, user.password))) {
      return true;
    }
    return false;
  }
}
