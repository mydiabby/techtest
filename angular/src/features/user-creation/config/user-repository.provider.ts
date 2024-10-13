import {InMemoryUserRepository} from "../infrastructure/in-memory-user.repository";
import {User} from "../../users/business/models/user";
import {USER_STORAGE_TOKEN} from "../../../_common/storage/user-storage.provider";
import {environment} from "../../../../env";
import {AxiosHttp} from "../../../_common/api/api-http-instance";
import {HttpUserRepository} from "../infrastructure/http-user.repository";

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY'

export const userRepositoryProvider = {
  provide: USER_REPOSITORY_TOKEN,
  useFactory: (storage: User[]) => {
    console.log(environment)
    if (!environment.production) return new InMemoryUserRepository(storage)
    return new HttpUserRepository(AxiosHttp.getInstance())
  },
  deps: [USER_STORAGE_TOKEN]
}

