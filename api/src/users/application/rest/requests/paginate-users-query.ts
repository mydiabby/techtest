import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { z } from 'zod'

/**
 * Schéma de validation pour une requête de pagination d'utilisateurs.
 */
export const paginateUsersQuerySchema = z.object({
    page: z
        .number({
            coerce: true
        })
        .min(0, 'page index must start at 0'),
    itemsPerPage: z
        .number({
            coerce: true
        })
        .min(1, 'minimum requested items must be 1')
        .max(50, 'cannot request more than 50 items')
})

/**
 * Schéma OpenAPI des paramètres d'URL pour une requête de pagination d'utilisateurs.
 */
export const paginateUsersQueryOpenApiSchema = {
    type: 'object',
    properties: {
        page: {
            type: 'integer',
            minimum: 0,
            description: 'The requested page index.'
        },
        itemsPerPage: {
            type: 'integer',
            minimum: 1,
            maximum: 50,
            description: 'The maximum count of items to include for each page.'
        }
    },
    required: ['page', 'itemsPerPage']
} as const satisfies SchemaObject

/**
 * Paramètres d'URL pour une requête de pagination d'utilisateurs.
 */
export type PaginateUsersQuery = z.infer<typeof paginateUsersQuerySchema>