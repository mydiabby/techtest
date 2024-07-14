import { User } from "src/domain/entities/user";
import {UserDto} from 'src/dto/userDto';

export const UserServiceKey = 'USER_PORT';
export interface UserService {
    getUsers: () => Promise<User[]>;
    addUser(newUser: UserDto): Promise<User>
    getUserBy(firstName: string, lastName: string): Promise<User | null>
}
