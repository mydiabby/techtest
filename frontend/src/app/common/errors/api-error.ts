import { HttpStatusCode } from '@angular/common/http'

/**
 * Représente une réponse d'erreur de l'API REST
 */
export class ApiErrorResponse {
    constructor(readonly status: HttpStatusCode, readonly message: string){}
}