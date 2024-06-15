export default class UnAuthorizationError extends Error {
  status: number = 401;
  code: string;
  stacktrace: string[] = [];

  constructor(message: string) {
    super(message);
    this.status = 401;
    this.code = "UNAUTHORIZED"
    Object.setPrototypeOf(this, UnAuthorizationError.prototype);
  }
}
