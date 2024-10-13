import { User } from 'src/features/user/business/models/user'

export interface UserService {
    getUsers: () => Promise<User[]>
}
