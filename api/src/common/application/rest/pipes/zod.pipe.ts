
import { PipeTransform, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

/**
 * Pipe de validation qui se base sur un schéma de la librarie zod.
 */
export class ZodValidationPipe implements PipeTransform {
    constructor(private readonly schema: ZodSchema) { }

    async transform(value: unknown): Promise<unknown> {
        try {
            return await this.schema.parseAsync(value)
        } catch (error: unknown) {
            if (error instanceof ZodError)
                throw new BadRequestException(`input validation failed (${error.errors.map(error => `"${error.path}": ${error.message}`).join(', ')})`)
            throw new InternalServerErrorException(error)
        }
    }
}