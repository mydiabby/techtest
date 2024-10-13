import {UserGateway} from "../business/ports/user.gateway";
import {Axios} from "axios";
import {UserVM} from "../business/models/user-vm";

export class HttpUserGateway implements UserGateway {
  constructor(private http: Axios) {}

  async findAll(): Promise<UserVM[]> {
    try {
      return await this.http.get('/users').then(response => response.data)
    } catch (error) {
      throw new Error('Error fetching data')
    }
  }
}
