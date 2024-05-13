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

  getUsers(params: any): Observable<{ users: User[], totalCount: number }> {
    return this.http.get<{ users: User[], totalCount: number }>(this.apiUrl + "/users", { params });
  }
}
