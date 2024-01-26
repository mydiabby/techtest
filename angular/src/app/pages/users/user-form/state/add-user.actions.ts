import { ICreateUserDto } from "../../createUserDto";

export class SetFirstName {
  static readonly type = '[AddUser] SetFirstName';

  constructor(public firstName: string) {}
}

export class SetLastName {
  static readonly type = '[AddUser] SetLastName';

  constructor(public lastName: string) {}
}

export class CreateUser {
  static readonly type = '[AddUser] CreateUser';

  constructor(public payload: ICreateUserDto) {}
}

export class SetError {
  static readonly type = '[AddUser] SetError';

  constructor(public error: string) {}
}

