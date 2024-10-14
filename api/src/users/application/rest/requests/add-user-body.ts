import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { z } from 'zod'

const nameSchema = z.string()
    .transform(s => s.trim())
    .refine(s => s.length !== 0, 'name must not be empty')
    .refine(s => s.length <= 100, 'name is too long')

/**
 * Schéma de validation pour un corps de requête de création d'utilisateur.
 */
export const addUserBodySchema = z.object({
    firstname: nameSchema,
    lastname: nameSchema
})

/**
 * Schéma OpenAPI de documentation pour un corps de requête de création d'utilisateur.
 */
export const addUserOpenApiSchema = {
    type: 'object',
    properties: {
        firstname: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            description: 'A firstname for the user to be created.'
        },
        lastname: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            description: 'A lastname for the user to be created.'
        }
    },
    required: ['firstname', 'lastname']
} as const satisfies SchemaObject

/**
 * La corps d'une requête de création d'utilisateur.
 */
export type AddUserBody = z.infer<typeof addUserBodySchema>