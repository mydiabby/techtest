import {UserGateway} from "../ports/user.gateway";
import {UserVM} from "../models/user-vm";

export class RetrieveUsers {
  constructor(private readonly _userGateway: UserGateway) {
  }

  async retrieve(): Promise<UserVM[]> {
    return this._userGateway.findAll()
  }
}
