import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserDTO } from '../interfaces/create-user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.apiURL}/users`);
  }

  addUser(createUserDTO: CreateUserDTO): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiURL}/users`, createUserDTO);
  }
}
