import { Observable, delay, of } from "rxjs";
import { User } from "../models/user.model";
import { UserService } from "../ports/user.port";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class InMemoryUserService extends UserService {

    private users: User[] = [
        { id: 1, firstname: 'William', lastname: 'Clint' },
        { id: 2, firstname: 'John', lastname: 'Doe' },
        { id: 3, firstname: 'Jean', lastname: 'Durand' },
        { id: 4, firstname: 'Nicolas', lastname: 'Martin' },
        { id: 5, firstname: 'Tom', lastname: 'Smith' }
    ];

    getAll(): Observable<User[]> {
        return of(this.users).pipe(
            delay(1000)
        );
    }

}