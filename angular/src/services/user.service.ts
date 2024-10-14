import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = `${environment.API_URL}/users`;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.url}`, {
      headers: { Accept: 'application/json' },
    });
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.url}/create`, user, {
      headers: { Accept: 'application/json' },
    });
  }
}
