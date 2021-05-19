import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedirectRepository } from "./entity/redirect.repository";
import { RedirectService } from "./redirect.service";

@Module({
  imports: [TypeOrmModule.forFeature([RedirectRepository])],
  providers: [RedirectService],
  exports: [RedirectService],
})
export class RedirectModule {}
