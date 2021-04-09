import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { unauthorizedPasswordException } from "../shared/exception/exception.index";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: "identity" });
  }

  async validate(identity: string, password: string): Promise<string> {
    const isSuccess = await this.authService.validationUser(identity, password);
    if (!isSuccess) {
      throw unauthorizedPasswordException;
    }
    return identity;
  }
}
