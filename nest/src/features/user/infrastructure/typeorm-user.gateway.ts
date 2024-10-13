import { UserService } from 'src/features/user/business/ports/user.port'
import { User } from 'src/features/user/business/models/user'
import { Repository } from 'typeorm'

export class TypeOrmUserGateway implements UserService {
    constructor(private usersRepository: Repository<User>) {}

    getUsers(): Promise<User[]> {
        return this.usersRepository
            .createQueryBuilder('user')
            .orderBy('LOWER(user.firstName)', 'ASC')
            .addOrderBy('LOWER(user.lastName)', 'ASC')
            .getMany()
    }
}
