import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class JwtBearerGuard implements CanActivate {
  constructor(private header_name: string) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers[this.header_name]) {
      return false;
    }
    request.headers[this.header_name] = request.headers[this.header_name].slice(
      7,
    );
    return true;
  }
}
