import { User } from "@entities/user";

export const UserServiceKey = 'USER_PORT';
export interface UserService {
    getUsers: () => Promise<User[]>;
}
