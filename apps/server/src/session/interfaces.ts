export type SessionWithRequestType = Request & { session: UserSessionType };
export type UserSessionType = {
  email: string;
};
