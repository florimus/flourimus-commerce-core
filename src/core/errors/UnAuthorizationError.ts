export default class UnAuthorizationError extends Error {
  status: number = 401;

  constructor(message: string) {
    super(message);
    this.status = 401;
    Object.setPrototypeOf(this, UnAuthorizationError.prototype);
  }
}
