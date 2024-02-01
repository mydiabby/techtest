import { User } from "src/domain/entities/user";

export const UserServiceKey = 'USER_PORT';
export interface UserService {

    getUsers: () => Promise<User[]>;

    getUser: (id: number) => Promise<User>;

    addUser: (user: User) => Promise<User>;

    updateUser: (id: number, updatedUser: User) => Promise<User>;

    deleteUser: (id: number) => Promise<void>;
}
