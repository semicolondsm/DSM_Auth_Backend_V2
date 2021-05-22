import { Module } from "@nestjs/common";
import { RedirectService } from "./redirect.service";

@Module({
  providers: [RedirectService],
  exports: [RedirectService],
})
export class RedirectModule {}
