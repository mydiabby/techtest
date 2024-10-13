import { AddUserCommand } from '../use-cases/add-user.handler'

export interface UserRepository {
    create(command: AddUserCommand): Promise<void>
}
