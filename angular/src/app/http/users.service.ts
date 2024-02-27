import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiPath = 'http://localhost:3000/users'

  usersListData = [
    {
      lastName: 'Billy',
      firstName: 'Jackson',
      id: 1,
    },
    {
      lastName: 'Tony',
      firstName: 'Hawk',
      id: 2,
    },
    {
      lastName: 'Michael',
      firstName: 'Stewart',
      id: 3,
    },
    {
      lastName: 'Lauren',
      firstName: 'Sparkson',
      id: 4,
    },
  ];

  constructor(private http: HttpClient) { }

  getAllUsers$(): Observable<User[]> {
    // return this.http.get<User[]>(`${this.apiPath}`);

    return of(this.usersListData);
  }

  createUser(userInfos: User): Observable<any> {
    return this.http.post<User>(`${this.apiPath}`, userInfos);
  }
}
