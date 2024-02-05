export enum ErrorHttpStatus {
  UnexpectedServerError = 500,
  BadRequest = 400,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  HeaderRangeNotSatisfiable = 416,
  NotImplemented = 501,
  WrongHeaderAccept = 406,
  Unauthorized = 401,
}