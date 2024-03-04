import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiPath = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  getAllUsers$(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiPath}`);
  }

  createUser(userCreateInfos: User): Observable<User> {
    return this.http.post<User>(`${this.apiPath}`, userCreateInfos);
  }
}
