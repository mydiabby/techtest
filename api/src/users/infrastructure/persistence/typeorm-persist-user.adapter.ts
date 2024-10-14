import { Repository } from 'typeorm'
import { User } from '../../domain/models/user'
import { PersistUser } from '../../domain/ports/persist-user.port'
import { UserEntity } from '../entities/user.entity'
import { UserEntityMapper } from '../mappers/user-entity.mapper'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

/**
 * Implémentation de {@link PersistUser} basée sur TypeORM.
 */
@Injectable()
export class TypeOrmPersistUser implements PersistUser {

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
        private readonly mapper: UserEntityMapper
    ){}

    async persist(user: User): Promise<void> {
        const entity = this.mapper.toEntity(user)
        await this.repository.save(entity)
        if (typeof user.id !== 'number')
            user.id = entity.id
    }
}