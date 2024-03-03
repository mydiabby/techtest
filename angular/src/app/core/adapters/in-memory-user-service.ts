import { Observable, delay, of } from "rxjs";
import { User } from "../models/user.model";
import { UserService } from "../ports/user.port";
import { Injectable } from "@angular/core";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable({
    providedIn: 'root'
})
export class InMemoryUserService extends UserService {

    private users: User[] = [
        { id: 1, firstName: 'William', lastName: 'Clint' },
        { id: 2, firstName: 'John', lastName: 'Doe' },
        { id: 3, firstName: 'Jean', lastName: 'Durand' },
        { id: 4, firstName: 'Nicolas', lastName: 'Martin' },
        { id: 5, firstName: 'Tom', lastName: 'Smith' }
    ];

    getAll(): Observable<User[]> {
        return of(this.users).pipe(
            delay(1000)
        );
    }

    addOne(userName: CreateUserDto): Observable<User> {
        const maxUserId = Math.max(...this.users.map(u => u.id));
        const createdUser: User = { id: maxUserId + 1, ...userName };
        this.users.push(createdUser);

        return of(createdUser).pipe(
            delay(1000)
        );
    }

}