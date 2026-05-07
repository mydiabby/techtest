import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export type SortableField = 'firstName' | 'lastName';
export type SortDirection = 'asc' | 'desc';

export interface GetUsersOptions {
  sortBy?: SortableField;
  sortDir?: SortDirection;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/users';

  getUsers(options: GetUsersOptions = {}): Observable<User[]> {
    let params = new HttpParams();
    if (options.sortBy) params = params.set('sortBy', options.sortBy);
    if (options.sortDir) params = params.set('sortDir', options.sortDir);
    return this.http.get<User[]>(this.apiUrl, { params });
  }

  createUser(firstName: string, lastName: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { firstName, lastName });
  }
}
