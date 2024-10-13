import { UserRepository } from '../business/ports/user.epository'
import { Repository } from 'typeorm'
import { User } from '../business/models/user'

import { AddUserCommand } from '../business/use-cases/add-user.handler'
import { BadRequestException } from '@nestjs/common'

export const DUPLICATE_USER_EXCEPTION_MESSAGE = 'A user with the same first name and last name already exists.'

export class TypeOrmUserRepository implements UserRepository {
    constructor(private usersRepository: Repository<User>) {}

    async create(command: AddUserCommand): Promise<void> {
        try {
            await this.usersRepository.save(command)
        } catch (error) {
            if (error.code === '23505') {
                throw new BadRequestException(DUPLICATE_USER_EXCEPTION_MESSAGE)
            }
            throw new Error('An error occurred while creating the user.')
        }
    }
}
