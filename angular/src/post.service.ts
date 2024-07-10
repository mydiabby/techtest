import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private apiUrl = 'http://localhost:3000/users/add'

  constructor(private http: HttpClient) {}

  createPost(data: any): Observable<any> {
    console.log('createPost launched', data)
    return this.http.post(this.apiUrl, data);
  }
}