import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IJwtPayload } from "../interface/jwt-payload.interface";

export const JwtPayloadParser = createParamDecorator(
  (_: any, context: ExecutionContext): IJwtPayload => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
