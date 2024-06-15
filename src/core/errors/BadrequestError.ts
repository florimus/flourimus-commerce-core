export default class BadRequestError extends Error {
  status: number = 400;
  code: string = "BADREQUEST";
  stacktrace: string[] = [];

  constructor(message: string) {
    super(message);
    this.status = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
