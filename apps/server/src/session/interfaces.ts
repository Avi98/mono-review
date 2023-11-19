export type SessionWithRequestType = Request & { session: UserSessionType };
export type UserSessionType = {
  email: string;
  user_Id: number;
};
