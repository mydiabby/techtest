import { UserService } from '../../business/ports/user.port'
import { GetFullNamesOfAllUsers } from '../../business/use-cases/getFullNameOfAllUsers'
import { USER_GATEWAY_TOKEN } from './user-gateway.provider'

export const GET_FULL_NAME_OF_ALL_USERS_TOKEN = 'GET_FULL_NAME_OF_ALL_USERS'

export const getFullNameOfAllUsersProvider = {
    provide: GET_FULL_NAME_OF_ALL_USERS_TOKEN,
    useFactory: async (userGateway: UserService) => {
        return new GetFullNamesOfAllUsers(userGateway)
    },
    inject: [USER_GATEWAY_TOKEN],
}
