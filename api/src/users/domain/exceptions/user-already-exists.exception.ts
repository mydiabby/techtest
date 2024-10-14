import { AddUserParams } from '../usecases/add-user.usecase'
import { UserException } from './user.exception'

/**
 * Survient lorsqu'on créé un utilisateur ayant les même champs `lastname` et `firstname` qu'un utilisateur en base.
 */
export class UserAlreadyExists extends UserException {

    constructor(params: AddUserParams){
        super(`user with firstname "${params.firstname}" and surname "${params.lastname}" already exists`)
    }
}