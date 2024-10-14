import { Injectable } from '@nestjs/common'
import { User } from '../../domain/models/user'
import { UserEntity } from '../entities/user.entity'

/**
 * Mapper entre {@link User} et {@link UserEntity}.
 */
@Injectable()
export class UserEntityMapper {
    /**
     * Convertir un utilisateur métier {@link User} vers une entité TypeORM {@link UserEntity}.
     * @param user L'utilisateur métier.
     * @returns Une entité TypeORM.
     */
    toEntity(user: User): UserEntity {
        const entity = new UserEntity()
        const { id } = user
        if (typeof id === 'number')
            entity.id = id
        entity.firstname = user.firstname
        entity.lastname = user.lastname
        return entity
    }

    /**
     * Convertir une entité TypeORM {@link UserEntity} vers un utilisateur métier {@link User}.
     * @param entity L'entité TypeORM
     * @returns Un utilisateur métier.
     */
    toDomain(entity: UserEntity): User {
        return new User({
            firstname: entity.firstname,
            lastname: entity.lastname,
            id: entity.id
        })
    }
}