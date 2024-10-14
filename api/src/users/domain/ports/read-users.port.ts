import { Page } from '../../../common/domain/models/page'
import { User } from '../models/user'

export type ReadUserParams = Readonly<{
    firstname?: string
    lastname?: string
}>

export type PaginateUsersParams = Readonly<{
    page: number, 
    itemsPerPage: number
    orderBy?: 'firstname'|'lastname'
}>

/**
 * Implémente des opérations de lecture d'utilisateurs.
 */
export interface ReadUsers {

    /**
     * Lit un ensemble d'utilisateurs sous forme de page.
     * @param page La page à lire.
     * @param itemsPerPage Le nombre d'utilisateurs pour chaque page.
     */
    readPage(params: PaginateUsersParams): Promise<Page<User>>

    /**
     * Lit un utilisateur spécifique
     * @param params Des critères de correspondance pour chercher l'utilisateur.
     */
    readOne(params: ReadUserParams): Promise<User|null>
}