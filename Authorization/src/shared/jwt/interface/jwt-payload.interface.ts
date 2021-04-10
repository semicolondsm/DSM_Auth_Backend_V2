export interface IJwtPayload {
  user_identity: string;
  client_id: string;
  type: "access" | "refresh";
}
