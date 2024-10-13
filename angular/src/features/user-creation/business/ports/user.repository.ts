import {User} from "../../../users/business/models/user";

export interface UserRepository {
  persist(user: User): Promise<void>
}
