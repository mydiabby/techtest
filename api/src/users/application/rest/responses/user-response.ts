import { ApiProperty } from '@nestjs/swagger'

export type UserResponseProps = Readonly<{
    id: number
    firstname: string
    lastname: string
}>

/**
 * Une réponse REST représentant un utilisateur.
 */
export class UserResponse {

    @ApiProperty({
        description: 'The user\'s unique identifier.',
        minimum: 1
    })
    readonly id: number

    @ApiProperty({
        description: 'The user\'s firstname.'
    })
    readonly firstname: string

    @ApiProperty({
        description: 'The user\'s lastname.'
    })
    readonly lastname: string

    constructor(props: UserResponseProps){
        this.id = props.id
        this.firstname = props.firstname
        this.lastname = props.lastname
    }
}