import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm'

/**
 * Table des utilisateurs.
 */
@Entity('users')
@Unique('unique_fullname', ['firstname', 'lastname'])
export class UserEntity {

    @PrimaryGeneratedColumn('identity')
    id!: number

    @Column({
        length: 250
    })
    @Index('firstname_index')
    firstname!: string

    @Column({
        length: 250
    })
    @Index('lastname_index')
    lastname!: string
}