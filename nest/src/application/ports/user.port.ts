import { CreateUserDTO } from "@dto/create-user";
import { User } from "@entities/user";
import { PaginationParams } from "../../shared/types/pagination";

export const UserServiceKey = 'USER_PORT';
export interface UserService {
    getUsers(params?: PaginationParams): Promise<{ users: User[]; totalUserCount: number }>;
    addUser: (createUserDTO: CreateUserDTO) => Promise<User>;
}
