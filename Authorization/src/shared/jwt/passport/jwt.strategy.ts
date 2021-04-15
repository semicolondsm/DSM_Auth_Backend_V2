import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { unauthorizedTokenException } from "../../../shared/exception/exception.index";
import { IJwtPayload } from "../interface/jwt-payload.interface";
import { ACCESS_TOKEN_HEADER, JWT_SECRET_KEY, REFRESH_TOKEN_HEADER } from "../jwt.constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log("hello");
    super({
      jwtFromRequest: ExtractJwt.fromHeader(ACCESS_TOKEN_HEADER),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  public async validate(payload: IJwtPayload) {
    if (payload.type !== "access") {
      throw unauthorizedTokenException;
    }
    return payload;
  }
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(REFRESH_TOKEN_HEADER),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  public async validate(payload: IJwtPayload) {
    if (payload.type !== "refresh") {
      throw unauthorizedTokenException;
    }
    return payload;
  }
}
