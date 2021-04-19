import { DsmauthProvideTokenDto } from "../../dsmauth/dto/dsmauth-token.dto";
import { DsmauthLoginDto } from "../../dsmauth/dto/dsmauth-login.dto";
import {
  badRequestException,
  forbiddenCodeException,
  unauthorizedPasswordException,
  unauthorizedSecretKey,
} from "../exception/exception.index";

export class MockDsmauthService {
  public async login({
    client_id,
    redirect_url,
    id,
    password,
  }: DsmauthLoginDto) {
    if (id !== "existId" || password !== "rightPassword") {
      throw unauthorizedPasswordException;
    }
    if (
      client_id !== "exist_client_id" ||
      redirect_url !== "http://test.redirecturl.com"
    ) {
      throw badRequestException;
    }
    return {
      location: `${redirect_url}?code=redirect_code`,
    };
  }

  public async provideToken({
    client_id,
    client_secret,
    code,
  }: DsmauthProvideTokenDto) {
    if (
      client_id !== "exist_client_id" ||
      client_secret !== "right_client_secret"
    ) {
      throw unauthorizedSecretKey;
    }
    if (code !== "rightCode") {
      throw forbiddenCodeException;
    }
    return {
      "access-token": "access_token",
      "refresh-token": "refresh_token",
    };
  }
}
