import { HttpException, Injectable } from '@nestjs/common'
import { ErrorResponse } from './error-response'

const defaultMessage = 'Internal server error'

/**
 * Factory utile pour créer des {@link ErrorResponse}.
 */
@Injectable()
export class ErrorResponseFactory {

    /**
     * Créer une réponse d'erreur REST à partir d'une {@link HttpException}.
     * @param exception L'objet {@link HttpException}.
     * @returns La réponse d'erreur.
     */
    fromHttpException(exception: HttpException): ErrorResponse {
        const status = exception.getStatus()
        return new ErrorResponse(status >= 500 ? defaultMessage : exception.message, status)
    }

    /**
     * Créer une réponse d'erreur REST à partir d'une {@link Error} quelconque.
     * @param error L'objet {@link Error}.
     * @returns La réponse d'erreur.
     */
    fromError(error: Error): ErrorResponse {
        return (error instanceof HttpException)
            ? this.fromHttpException(error)
            : new ErrorResponse(defaultMessage, 500)
    }

    /**
     * Créer une réponse d'erreur REST à partir d'un type inconnu.
     * @param error L'objet qui a été levé.
     * @returns La réponse d'erreur.
     */
    fromUnknown(unknown: unknown): ErrorResponse {
        return unknown instanceof Error
            ? this.fromError(unknown)
            : new ErrorResponse(defaultMessage, 500)
    }
}