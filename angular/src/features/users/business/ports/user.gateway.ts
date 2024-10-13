import {UserVM} from "../models/user-vm";

export interface UserGateway {
  findAll(): Promise<UserVM[]>
}
