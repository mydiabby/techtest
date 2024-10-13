import { TypeOrmUserGateway } from '../../infrastructure/typeorm-user.gateway'
import { Repository } from 'typeorm'
import { User } from '../../business/models/user'
import { getRepositoryToken } from '@nestjs/typeorm'

export const USER_GATEWAY_TOKEN = 'USER_GATEWAY'

export const userGatewayProvider = {
    provide: USER_GATEWAY_TOKEN,
    useFactory: (userRepository: Repository<User>) => new TypeOrmUserGateway(userRepository),
    inject: [getRepositoryToken(User)],
}
