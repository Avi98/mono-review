export class UnAuthorizedError extends Error {
  constructor(error: Error) {
    super(error.message);
    this.message = error.message;
    this.name = "UnAuthorized";
  }
}
