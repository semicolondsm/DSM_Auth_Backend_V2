import { DsmauthLoginDto } from "../../dsmauth/dto/dsmauth-login.dto";
import {
  badRequestException,
  unauthorizedPasswordException,
} from "../exception/exception.index";

/**

client_id: "exist_client_id",
      redirect_url: "http://test.redirecturl.com",
      id: "existId",
      password: "rightPassword",
 */

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
}
