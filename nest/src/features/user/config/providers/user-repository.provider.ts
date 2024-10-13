import { Repository } from 'typeorm'
import { User } from '../../business/models/user'
import { TypeOrmUserRepository } from '../../infrastructure/typeorm-user.repository'
import { getRepositoryToken } from '@nestjs/typeorm'

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY'
export const userRepositoryProvider = {
    provide: USER_REPOSITORY_TOKEN,
    useFactory: (usersRepository: Repository<User>) => new TypeOrmUserRepository(usersRepository),
    inject: [getRepositoryToken(User)],
}
