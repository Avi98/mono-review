export type SessionWithRequestType = Request & {
  session: { email: string };
};
