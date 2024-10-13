import {UserRepository} from "../business/ports/user.repository";
import {AddUser} from "../business/use-cases/add-user";
import {USER_REPOSITORY_TOKEN} from "./user-repository.provider";
import {ID_GENERATOR_TOKEN} from "../../../_common/crypto/id-generator.provider";

export const ADD_USER_TOKEN = 'ADD_USER'

export const addUserProvider = {
  provide: ADD_USER_TOKEN,
  useFactory: (repository: UserRepository, idGenerator: () => string) => new AddUser(repository, idGenerator),
  deps: [USER_REPOSITORY_TOKEN, ID_GENERATOR_TOKEN]
}
