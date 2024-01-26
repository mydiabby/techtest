import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap } from 'rxjs';
import { ConfigService } from '../../config.service';
import { ICreateUserDto } from './createUserDto';

@Injectable()
export class UserService {
  readonly apiUrl: string = '';

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.apiUrl = this.configService.getConfig().apiUrl;
  }

  createUser(createUserDto: ICreateUserDto) {
    return this.http.post(this.apiUrl + '/users', createUserDto).pipe(
      tap(
        ((response: any) => {
          return response;
        })
      ),
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }

  getFullNamesOfAllUsers() : Observable<string[]> {
    return this.http.get(this.apiUrl + '/users').pipe(
      map(
        ((response: any) => {
          const fullNames: string[] = [];
          for(const key in response) {
            fullNames.push(response[key]);
          }
          return fullNames;
        })
      )
    );
  }
}
