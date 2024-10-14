import { BehaviorSubject, Observable } from 'rxjs'
import { Page } from '../../common/models/page'
import { User } from '../models/user'
import { Injectable } from '@angular/core'
import { UsersRestService } from '../services/users-rest.service'

export const itemsPerPageOptions = [5, 10, 25, 50] as const
export type ItemsPerPage = typeof itemsPerPageOptions[number]

export type LoadParams = Readonly<{
    page?: number
    itemsPerPage?: ItemsPerPage
}>

export type CurrentParams = Readonly<{
    currentPage: number
    itemsPerPage: ItemsPerPage
}>

export type CurrentPage = 
    |Readonly<{
        step: 'loaded',
        page: Page<User>
    }>
    |Readonly<{
        step: 'loading',
        rememberedTotal?: number
    }>
    |Readonly<{
        step: 'error',
        error: Error
    }>

@Injectable({
    providedIn: 'root'
})
export class UsersPaginationStore {

    private readonly page$ = new BehaviorSubject<CurrentPage>({
        step: 'loading'
    })

    private readonly params$ = new BehaviorSubject<CurrentParams>({
        currentPage: 0,
        itemsPerPage: 5
    })

    constructor(private readonly usersRestService: UsersRestService){}

    /**
     * Etat des paramètres de pagination. 
     */
    params(): Observable<CurrentParams> {
        return this.params$.asObservable()
    }

    /**
     * Etat de la page actuelle.
     */
    page(): Observable<CurrentPage> {
        return this.page$.asObservable()
    }

    /**
     * Action de chargement de la pagination (avec des paramètres potentiellement nouveaux).
     */
    load(params: LoadParams = {}): void {
        const currentParams = this.params$.value
        const currentPage=  this.page$.value
        const newPage = (() => {
            if (typeof params.itemsPerPage === 'number' && params.itemsPerPage !== currentParams.itemsPerPage)
                return 0
            return typeof params.page === 'number'
                ? params.page
                : currentParams.currentPage
        })()
        const newItemsPerPage = typeof params.itemsPerPage === 'number' ? params.itemsPerPage : currentParams.itemsPerPage
        const newParams = {
            currentPage: newPage,
            itemsPerPage: newItemsPerPage
        }
        
        this.params$.next(newParams)
        this.page$.next({ step: 'loading', ...(currentPage.step === 'loaded' ? { rememberedTotal: currentPage.page.total } : {}) })
        this.usersRestService.paginate(newParams.currentPage, newParams.itemsPerPage)
            .subscribe({
                next: page => this.page$.next({
                    step: 'loaded',
                    page
                }),
                error: error => this.page$.next({
                    step: 'error',
                    error
                })
            })
    }
}