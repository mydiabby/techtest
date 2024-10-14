import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse, ApiExtraModels, ApiInternalServerErrorResponse, ApiQuery, DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ErrorResponse } from '../responses/error-response'
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import { NestExpressApplication } from '@nestjs/platform-express'

export const DOCS_PATH = '/docs'

export function setupOpenApi(app: NestExpressApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Tech test')
        .setDescription('Some documentation for this tech test !')
        .setVersion('1.0')
        .addTag('users')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup(DOCS_PATH, app, document)
}

/**
 * Generic REST API responses decorator.
 */
export const GenericRestResponses = () => applyDecorators(
    ApiExtraModels(ErrorResponse),
    ApiInternalServerErrorResponse({
        description: 'An internal server occurred.',
        type: ErrorResponse
    }),
    ApiBadRequestResponse({
        description: 'Request parameters were malformed.',
        type: ErrorResponse
    })
)

/**
 * Turn an object schema into multiple {@link ApiQuery} decorators, merged into one.
 * @param schemaObject The query object schema
 */
export const ApiQueryParameters = (schemaObject: SchemaObject) => applyDecorators(
    ...Object.entries(schemaObject.properties!).map(([name, schema]) => ApiQuery({
        name,
        schema,
        required: schemaObject.required?.includes(name) ?? false
    }))
)
