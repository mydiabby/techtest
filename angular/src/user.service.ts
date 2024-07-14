import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

export type User = {
  id:string,
  firstName:string,
  lastName:string,
}

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private postUrl = `${environment.apiUrl}/users/add`
  private getUrl =  `${environment.apiUrl}/users/`

  constructor(private http: HttpClient) {}

  createUser(data: any): Observable<any> {
    return this.http.post(this.postUrl, data);
  }

  getUsers ():Observable<User[]>{
    return this.http.get<User[]>(this.getUrl)
  }
}