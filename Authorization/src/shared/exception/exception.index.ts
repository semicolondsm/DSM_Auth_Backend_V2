import {
  BadRequestException,
  ForbiddenException,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

export const badRequestException = new BadRequestException();
export const unauthorizedTokenException = new UnauthorizedException(
  "Unauthorized Token",
);
export const expiredTokenException = new UnauthorizedException("Expired Token");
export const unauthorizedCodeException = new UnauthorizedException(
  "Unauthorized Code",
);
export const unauthorizedIDException = new UnauthorizedException(
  "Unauthorized ID",
);
export const unauthorizedPasswordException = new UnauthorizedException(
  "Unauthorized password",
);
export const unauthorizedSecretKey = new UnauthorizedException(
  "Unauthorized Secret Key",
);
export const forbiddenCodeException = new ForbiddenException("Forbidden Code");
export const alreadySignupException = new ForbiddenException("Already Signup");
export const notFoundEmailException = new NotFoundException("Not Found Email");
export const notAllowedIDException = new MethodNotAllowedException(
  "Not Allowed ID",
);
