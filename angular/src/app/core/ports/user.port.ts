import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { CreateUserDto } from "../dto/create-user.dto";

export abstract class UserService {
    abstract getAll(): Observable<User[]>;
    abstract addOne(userName: CreateUserDto): Observable<User>;
}
