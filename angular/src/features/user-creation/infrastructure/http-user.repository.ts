import {UserRepository} from "../business/ports/user.repository";
import {Axios} from "axios";
import {User} from "../../users/business/models/user";

export class HttpUserRepository implements UserRepository {
  constructor(private http: Axios) {
  }

  async persist(user: User): Promise<void> {
      const response = await this.http.post('/users', {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      })
      if (response.status !== 201) throw new Error('Error persisting user')
  }
}
