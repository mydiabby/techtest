import { HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { Request, Response } from 'express'
import { ErrorResponseFactory } from '../responses/error-response.factory'

/**
 * Gère les exceptions qui surviennent sur la couche REST (logging, réponse...)
 */
@Injectable()
export class RestExceptionHandler {

    constructor(private readonly errorResponseMapper: ErrorResponseFactory){}

    /**
     * Gérer une exception quelconque.
     * A utiliser au sein des {@link ExceptionFilter} qui ne connaissent pas les types d'exceptions qu'ils gèrent (typiquement un gestionnaire d'erreur global).
     * @param request La requête REST.
     * @param response La réponse REST.
     * @param exception L'objet qui a été levé (peut être une erreur, ou peut être n'importe quoi).
     */
    handleAny(request: Request, response: Response, exception: unknown): void {
        this.log(request, exception)
        this.sendResponse(response, exception)
    }

    /**
     * Gérer un objet clairement identifié comme étant un objet Error.
     * A utiliser au sein des {@link ExceptionFilter} qui connaissent les types d'exceptions qu'ils manipulent (typiquement des types d'erreur issus de la couche domaine).
     * @param request La requête REST.
     * @param response La réponse REST.
     * @param exception L'objet {@link Error} représentant l'exception.
     * @param mapToHttp Une fonction de transformation de l'erreur vers un type {@link HttpException} qui sera utilisé pour créer la réponse HTTP.
     */
    handleBusinessException<T extends Error>(
        request: Request, 
        response: Response, 
        exception: T, mapToHttp: 
        (e: T) => HttpException|undefined
    ): void {
        this.log(request, exception)
        const mappedException = mapToHttp(exception)
        if (!mappedException)
            Logger.error(`could not map ${exception.constructor.name} to ${HttpException.name}`)
        this.sendResponse(response, mappedException ?? new InternalServerErrorException())
    }

    private sendResponse(response: Response, exception: unknown){
        const errorResponse = this.errorResponseMapper.fromUnknown(exception)
        response.status(errorResponse.status)
        response.json(errorResponse)
    }

    private log(request: Request, exception: unknown): void {
        const format = (errorMessage: string) => `${request.method} ${request.url} from ${request.ip} : ${errorMessage}`

        if (exception instanceof NotFoundException)
            return

        if (exception instanceof Error)
            Logger.error(format(exception.message))
        else 
            Logger.error(format(JSON.stringify({ type: typeof exception, repr: `${exception}` })))
        
    }
}