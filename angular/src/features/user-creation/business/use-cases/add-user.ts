import {User} from "../../../users/business/models/user";

import {UserRepository} from "../ports/user.repository";
import {AddUserCommand} from "../models/add-user-command";

export class AddUser {
  constructor(private readonly _userRepository: UserRepository, private readonly _idGenerator: () => string) {
  }

  async createAUser(user: AddUserCommand) {
    await this._userRepository.persist(new User(this._idGenerator(), user.firstName, user.lastName))
  }
}
