import {UserRepository} from "../business/ports/user.repository";
import {User} from "../../users/business/models/user";

export class InMemoryUserRepository implements UserRepository {

  constructor(private readonly _usersStorage: User[]) {
  }

  async persist(user: User): Promise<void> {
    this._usersStorage.push(user)
  }
}
