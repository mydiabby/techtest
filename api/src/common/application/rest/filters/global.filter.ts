import { ArgumentsHost, ExceptionFilter, Injectable } from '@nestjs/common'
import { Request, Response } from 'express'
import { RestExceptionHandler } from '../services/rest-exception-handler.service'

/**
 * Gestionnaire d'exception global (catch-all).
 */
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {

    constructor(private readonly exceptionHandler: RestExceptionHandler) { }

    catch(exception: unknown, host: ArgumentsHost): void {

        const http = host.switchToHttp()

        this.exceptionHandler.handleAny(
            http.getRequest<Request>(), 
            http.getResponse<Response>(), 
            exception
        )
    }
}