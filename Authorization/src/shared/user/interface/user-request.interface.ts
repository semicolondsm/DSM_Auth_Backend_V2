import { Request } from "express";
import { IJwtPayload } from "../../../shared/jwt/interface/jwt-payload.interface";

export interface IUserReqeust extends Request {
  user: IJwtPayload;
}
