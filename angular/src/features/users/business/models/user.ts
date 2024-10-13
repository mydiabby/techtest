import {UserVM} from "./user-vm";

export class User {
  constructor(public id: string, public firstName: string, public lastName: string) {}

  toUserVM(): UserVM {
    return new UserVM(this.id, `${this.firstName} ${this.lastName}`)
  }
}
