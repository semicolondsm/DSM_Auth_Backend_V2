import { Module } from "@nestjs/common";
import { DsmauthService } from "./dsmauth.service";
import { DsmauthController } from "./dsmauth.controller";

@Module({
  providers: [DsmauthService],
  controllers: [DsmauthController],
})
export class DsmauthModule {}
