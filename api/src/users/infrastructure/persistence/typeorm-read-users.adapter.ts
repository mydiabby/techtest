import { Repository } from 'typeorm'
import { Page } from '../../../common/domain/models/page'
import { User } from '../../domain/models/user'
import { PaginateUsersParams, ReadUserParams, ReadUsers } from '../../domain/ports/read-users.port'
import { UserEntity } from '../entities/user.entity'
import { UserEntityMapper } from '../mappers/user-entity.mapper'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

/**
 * Implémentation de {@link ReadUsers} basée sur TypeORM.
 */
@Injectable()
export class TypeOrmReadUsers implements ReadUsers {

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
        private readonly mapper: UserEntityMapper
    ){}

    async readPage(params: PaginateUsersParams): Promise<Page<User>> {
        const [entities, total] = await this.repository.findAndCount({
            skip: params.itemsPerPage * params.page,
            take: params.itemsPerPage,
            ...(params.orderBy ? { order: { [params.orderBy]: 'ASC' } } : {})
        })
        return new Page(entities.map(entity => this.mapper.toDomain(entity)), total)
    }
    
    readOne(params: ReadUserParams): Promise<User | null> {
        return this.repository.findOneBy({
            ...params
        })
    }
}