import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtBearerGuard } from "../shared/jwt/guard/jwt-bearer.guard";
import { Consumer } from "../consumer/entity/consumer.entity";
import { AppService } from "./app.service";
import { ACCESS_TOKEN_HEADER } from "../shared/jwt/jwt.constant";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard("jwt"))
  @UseGuards(new JwtBearerGuard(ACCESS_TOKEN_HEADER))
  @Get("myservice")
  public async myService(): Promise<Consumer[]> {
    return await this.appService.myService();
  }
}
