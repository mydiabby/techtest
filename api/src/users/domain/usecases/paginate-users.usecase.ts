import { Page } from '../../../common/domain/models/page'
import { User } from '../models/user'
import { ReadUsers } from '../ports/read-users.port'

export type PaginateUsersParams = Readonly<{
    page: number
    itemsPerPage: number
}>

/**
 * Usecase de lecture d'un ensemble d'utilisateurs.
 */
export class PaginateUsersUseCase {

    constructor(private readonly readUsers: ReadUsers){}

    /**
     * Lire des utilisateurs.
     * @param params Paramètres de pagination à utiliser.
     * @returns Une page d'utilisateurs.
     */
    paginate(params: PaginateUsersParams): Promise<Page<User>> {
        return this.readUsers.readPage({
            ...params,
            orderBy: 'lastname'
        })
    }
}