import { Injectable } from '@nestjs/common'
import { User } from '../../../domain/models/user'
import { UserResponse } from '../responses/user-response'

/**
 * Mapper d'un utilisateur métier {@link User} vers une réponse REST {@link UserResponse}.
 */
@Injectable()
export class UserResponseMapper {
    fromDomainUser(user: User): UserResponse {
        const { id } = user

        if (typeof id !== 'number')
            throw Error('cannot represent non-persisted user on REST layer')

        return new UserResponse({
            firstname: user.firstname,
            lastname: user.lastname,
            id
        })
    }
}