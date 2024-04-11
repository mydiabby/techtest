import { CreateUserDTO } from "src/domain/dto/create-user";
import { User } from "src/domain/entities/user";

export const UserServiceKey = 'USER_PORT';
export interface UserService {
    getUsers: () => Promise<User[]>;
    addUser: (createUserDTO: CreateUserDTO) => Promise<User>;
}
