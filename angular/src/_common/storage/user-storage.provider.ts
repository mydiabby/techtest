import {usersFixtures} from "../../features/users/infrastructure/in-memory/users.fixtures";

export const USER_STORAGE_TOKEN = 'USER_STORAGE'

export const userStorageProvider = {
  provide: USER_STORAGE_TOKEN,
  useValue: usersFixtures
}
