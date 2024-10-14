import { ApiProperty } from '@nestjs/swagger'

/**
 * Représente le corps d'une réponse d'erreur sur la couche REST.
 */
export class ErrorResponse {

    @ApiProperty({
        description: 'An error description.'
    })
    readonly message: string

    @ApiProperty({
        description: 'The response status code.'
    })
    readonly status: number

    constructor(message: string, status: number){
        this.message = message
        this.status = status
    }
}