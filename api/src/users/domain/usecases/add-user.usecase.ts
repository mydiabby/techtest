import { UserAlreadyExists } from '../exceptions/user-already-exists.exception'
import { User } from '../models/user'
import { PersistUser } from '../ports/persist-user.port'
import { ReadUsers } from '../ports/read-users.port'

export type AddUserParams = Readonly<{
    firstname: string
    lastname: string
}>

/**
 * Fonctionnalité d'ajout d'un utilisateur.
 */
export class AddUserUseCase {

    constructor(private readonly readUsers: ReadUsers, private readonly persistUser: PersistUser){}

    /**
     * Créer un utilisateur.
     * @param params Paramètres de création de l'utilisateur.
     * @returns L'utilisateur créé.
     * @throws {@link UserAlreadyExists}
     */
    async add(params: AddUserParams): Promise<User> {
        const existing = await this.readUsers.readOne({
            firstname: params.firstname,
            lastname: params.lastname
        })
        if (existing !== null)
            throw new UserAlreadyExists(params)
        const user = new User({
            firstname: params.firstname,
            lastname: params.lastname
        })
        await this.persistUser.persist(user)
        return user
    } 
}