import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

export type User = {
  id:string,
  firstName:string,
  lastName:string,
  email:string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private postUrl = `${environment.apiUrl}/users/add`
  private getUrl =  `${environment.apiUrl}/users/`

  constructor(private http: HttpClient) {}

  createPost(data: any): Observable<any> {
    console.log('createPost launched', data)
    return this.http.post(this.postUrl, data);
  }

  getUsers ():Observable<User[]>{
    return this.http.get<User[]>(this.getUrl)
  }
}