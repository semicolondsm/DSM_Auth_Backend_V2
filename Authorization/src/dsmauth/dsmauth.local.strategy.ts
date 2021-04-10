import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { unauthorizedPasswordException } from "../shared/exception/exception.index";
import { DsmauthService } from "./dsmauth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly dsmauthService: DsmauthService) {
    super({ usernameField: "id" });
  }

  async validate(identity: string, password: string): Promise<string> {
    const isSuccess = await this.dsmauthService.validationUser(
      identity,
      password,
    );
    if (!isSuccess) {
      throw unauthorizedPasswordException;
    }
    return identity;
  }
}
