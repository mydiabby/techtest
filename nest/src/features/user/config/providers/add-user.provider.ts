import { UserRepository } from '../../business/ports/user.epository'
import { AddUserHandler } from '../../business/use-cases/add-user.handler'
import { USER_REPOSITORY_TOKEN } from './user-repository.provider'

export const addUserProvider = {
    provide: AddUserHandler,
    useFactory: (userRepository: UserRepository) => new AddUserHandler(userRepository),
    inject: [USER_REPOSITORY_TOKEN],
}
