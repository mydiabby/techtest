import { CreateUserDTO } from "@dto/create-user";
import { User } from "@entities/user";

export const UserServiceKey = 'USER_PORT';
export interface UserService {
    getUsers: () => Promise<User[]>;
    addUser: (createUserDTO: CreateUserDTO) => Promise<User>;
}
