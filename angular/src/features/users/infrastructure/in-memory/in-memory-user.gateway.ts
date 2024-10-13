import {UserGateway} from "../../business/ports/user.gateway";
import {User} from "../../business/models/user";
import {UserVM} from "../../business/models/user-vm";

export class InMemoryUserGateway implements UserGateway {

  constructor(private readonly _usersStorage: User[] = []) {
    this._usersStorage = _usersStorage
  }

  async findAll(): Promise<UserVM[]> {
    return this._usersStorage.map(user => user.toUserVM())
  }

  feedWith(users: User[]) {
    this._usersStorage.push(...users)
  }
}

