import { UserService } from '../ports/user.port'
import { User } from 'src/features/user/business/models/user'
import { UserVM } from '../models/user-vm'

export class GetFullNamesOfAllUsers {
    constructor(private userService: UserService) {}

    async execute(): Promise<UserVM[]> {
        const users = await this.userService.getUsers()
        return this.getListOfFullNamesOfUser(users)
    }

    getListOfFullNamesOfUser(users: User[]): UserVM[] {
        return users.map((user) => new UserVM(user.id, user.getFullName()))
    }
}
