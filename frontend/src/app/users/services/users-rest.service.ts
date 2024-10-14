import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Page } from '../../common/models/page'
import { User } from '../models/user'
import { Inject, Injectable } from '@angular/core'
import { BACKEND_URL_SUPPLIER } from '../../app.tokens'

type PageResponse<T> = Readonly<{
    items: readonly T[],
    total: number
}>

type UserResponse = Readonly<{
    id: number
    lastname: string
    firstname: string
}>

function mapUserResponse(userResponse: UserResponse): User {
    return new User({
        ...userResponse
    })
}

/**
 * Interactions HTTP avec l'API REST et conversions des réponses.
 */
@Injectable({
    providedIn: 'root'
})
export class UsersRestService {

    constructor(
        private readonly http: HttpClient,
        @Inject(BACKEND_URL_SUPPLIER)
        private readonly backendUrl: () => URL
    ){}

    paginate(page: number, itemsPerPage: number): Observable<Page<User>> {
        const url = this.backendUrl()
        url.pathname = '/users'
        url.searchParams.set('page', page.toString())
        url.searchParams.set('itemsPerPage', itemsPerPage.toString())
        return this.http.get<PageResponse<UserResponse>>(url.toString())
            .pipe(
                map(page => new Page(
                    page.items.map(item => mapUserResponse(item)),
                    page.total
                ))
            )
    }

    add(firstname: string, lastname: string): Observable<User> {
        const url = this.backendUrl()
        url.pathname = '/users'
        return this.http.post<UserResponse>(
            url.toString(),
            {
                firstname,
                lastname
            }
        ).pipe(
            map(user => mapUserResponse(user))
        )
    }
}