import {RetrieveUsers} from "../business/use-cases/retrieve-users";
import {UserGateway} from "../business/ports/user.gateway";
import {USER_GATEWAY_TOKEN} from "./user-gateway.provider";

export const RETRIEVE_USERS_TOKEN = 'RETRIEVE_USERS'

export const retrieveUsersProvider = {
  provide: RETRIEVE_USERS_TOKEN,
  useFactory: (userGateway: UserGateway) => new RetrieveUsers(userGateway),
  deps: [USER_GATEWAY_TOKEN]
}
