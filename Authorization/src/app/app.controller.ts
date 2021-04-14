import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Consumer } from "src/consumer/entity/consumer.entity";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get("myservice")
  public async myService(): Promise<Consumer[]> {
    return await this.appService.myService();
  }
}
