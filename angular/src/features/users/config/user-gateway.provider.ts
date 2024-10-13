import {InMemoryUserGateway} from "../infrastructure/in-memory/in-memory-user.gateway";
import {USER_STORAGE_TOKEN} from "../../../_common/storage/user-storage.provider";
import {User} from "../business/models/user";
import {AxiosHttp} from "../../../_common/api/api-http-instance";
import {environment} from "../../../../env";
import {HttpUserGateway} from "../infrastructure/http-user.gateway";


export const USER_GATEWAY_TOKEN = 'USER_GATEWAY'

export const userGatewayProvider = {
  provide: USER_GATEWAY_TOKEN,
  useFactory: (storage: User[]) => {
    if (!environment.production) return new InMemoryUserGateway(storage)
    return new HttpUserGateway(AxiosHttp.getInstance())
  },
  deps: [USER_STORAGE_TOKEN]
}

