import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { UserService } from "../ports/user.port";
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable({
    providedIn: 'root'
})
export class ApiUserService extends UserService {

    private http = inject(HttpClient);

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/public/users`);
    }

    addOne(userName: CreateUserDto): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/public/users`, userName)
    }

}