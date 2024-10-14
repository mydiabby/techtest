import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { User } from '../models/user'
import { UsersRestService } from '../services/users-rest.service'
import { Injectable } from '@angular/core'
import { ApiErrorResponse } from '../../common/errors/api-error'
import { HttpStatusCode } from '@angular/common/http'

export type AddUserParams = Readonly<{
    firstname: string
    lastname: string
}>

export type CreationState =
    | Readonly<{
        step: 'waiting'
    }>
    | Readonly<{
        step: 'adding',
        params: AddUserParams
    }>
    | Readonly<{
        step: 'done'
    }>
    | Readonly<{
        step: 'error',
        error: 'already-exists' | Error
    }>

/**
 * Gestion de l'état de la fonctionnalité d'ajout d'utilisateur.
 */
@Injectable({
    providedIn: 'root'
})
export class AddUserStore {

    constructor(private readonly usersRestService: UsersRestService) { }

    private readonly creation$ = new BehaviorSubject<CreationState>({
        step: 'waiting'
    })

    private readonly created$ = new Subject<User>()

    /**
     * Etat du formulaire de création.
     */
    creation(): Observable<CreationState> {
        return this.creation$.asObservable()
    }

    /**
     * Succès de créations d'utilisateurs
     */
    created(): Observable<User> {
        return this.created$.asObservable()
    }

    /**
     * Action d'arrivée sur le formulaire.
     */
    start(): void {
        if (this.creation$.value.step !== 'waiting')
            this.creation$.next({
                step: 'waiting'
            })
    }

    /**
     * Action de soumission du formulaire.
     */
    add(params: AddUserParams): void {
        this.creation$.next({
            step: 'adding',
            params
        })
        this.usersRestService.add(params.firstname, params.lastname)
            .subscribe({
                next: user => this.created$.next(user),
                error: error => {
                    if (error instanceof ApiErrorResponse && error.status === HttpStatusCode.Conflict)
                        this.creation$.next({
                            step: 'error',
                            error: 'already-exists'
                        })
                    else
                        this.creation$.next({
                            step: 'error',
                            error
                        })
                }
            })
    }
}