import { ArgumentsHost, Catch, ConflictException, ExceptionFilter } from '@nestjs/common'
import { UserException } from '../../../domain/exceptions/user.exception'
import { Response, Request } from 'express'
import { UserAlreadyExists } from '../../../domain/exceptions/user-already-exists.exception'
import { RestExceptionHandler } from '../../../../common/application/rest/services/rest-exception-handler.service'

/**
 * Filtre d'exceptions pour les erreurs métier du domaine utilisateur ({@link UserException}).
 */
@Catch(UserException)
export class UserExceptionsFilter implements ExceptionFilter {

    constructor(private readonly handler: RestExceptionHandler){}

    catch(exception: UserException, host: ArgumentsHost) {
        
        const http = host.switchToHttp()

        this.handler.handleBusinessException(
            http.getRequest<Request>(),
            http.getResponse<Response>(),
            exception,
            e => {
                if (e instanceof UserAlreadyExists){
                    return new ConflictException(e.message)
                }
            }
        )
    }
}