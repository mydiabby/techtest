import { CreateUserDto } from "src/domain/dto/create-user.dto";
import { User } from "src/domain/entities/user";

export const UserServiceKey = 'USER_PORT';
export interface UserService {
    getUsers: () => Promise<User[]>;
    addUser: (user: CreateUserDto) => Promise<User>;
}
