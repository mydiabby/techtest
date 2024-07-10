import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  private postUrl = 'http://localhost:3000/users/add'
  private getUrl =  "http://localhost:3000/users"

  constructor(private http: HttpClient) {}

  createPost(data: any): Observable<any> {
    console.log('createPost launched', data)
    return this.http.post(this.postUrl, data);
  }

  getUsers ():Observable<User[]>{
    return this.http.get<User[]>(this.getUrl)
  }
}