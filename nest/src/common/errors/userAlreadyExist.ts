import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExist extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}