import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(params: any): Observable<{ users: User[], totalUserCount: number }> {
    return this.http.get<{ users: User[], totalUserCount: number, id: number }>(this.apiUrl + "/users", { params });
  }
}
