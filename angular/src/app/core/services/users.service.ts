import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CONFIG } from '../../../config';
import { IUser } from '../../shared/interfaces/users.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  private userEndpoint = CONFIG.endpoints.api + '/users';

  public getUsers(): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.userEndpoint}`, {})
      .pipe(tap((res) => res));
  }

  public addUsers(user: IUser): Observable<void> {
    return this.http
      .post<void>(`${this.userEndpoint}`, user)
      .pipe(tap((res) => res));
  }

}
