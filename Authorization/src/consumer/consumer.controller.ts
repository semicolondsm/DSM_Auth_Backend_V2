import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ConsumerService } from "./consumer.service";
import {
  RegistrationDto,
  RegistrationResponseData,
} from "./dto/registration.dto";

@Controller("consumer")
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("registration")
  public async registration(
    @Body() dto: RegistrationDto,
  ): Promise<RegistrationResponseData> {
    return await this.consumerService.registration(dto);
  }
}
