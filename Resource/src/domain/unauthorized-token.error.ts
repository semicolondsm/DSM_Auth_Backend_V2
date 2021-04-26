import { UnauthorizedException } from "@nestjs/common";

export const UnauthorizedTokenException = new UnauthorizedException(
  "Unauthorized Token",
);
