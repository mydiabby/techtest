import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

/**
 * Représente le corps d'une réponse de pagination sur la couche REST.
 */
export class PageResponse<T> {
    constructor(readonly items: readonly T[], readonly total: number){}
}

/**
 * Créer un schema OpenAPI pour une réponse de page.
 * @param itemsSchema Le type OpenAPI des données contenues dans la page, sous forme de chemin de référence.
 */
export const pageResponseOpenApiSchema = (itemsSchemaRef: string): SchemaObject => ({
    type: 'object',
    properties: {
        items: {
            type: 'array',
            items: {
                $ref: itemsSchemaRef
            }
        },
        total: {
            type: 'integer',
            minimum: 0
        }
    }
})
