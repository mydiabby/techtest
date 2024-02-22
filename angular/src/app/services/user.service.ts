import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { User } from '../models/user';

import { environment } from '@environments/environment';

import { QueryObserverResult, injectQuery, injectQueryClient } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private http: HttpClient = inject(HttpClient);
  private query = injectQuery();
  private queryClient = injectQueryClient();

  // users = [
  //   new User(1, 'gilles', 'coppe'),
  //   new User(2, 'joe', 'bar'),
  // ]



  pascalCase(name: string) {
    return name.replace(/(\w)(\w*)/g,
        (g0,g1,g2) => {return g1.toUpperCase() + g2.toLowerCase();});
  }

  queryGetAll(): Result<QueryObserverResult<User[], Error>> {
    return this.query({
      queryKey: ['users'],
      queryFn: () =>
        lastValueFrom(
          this.http.get<User[]>(`${environment.apiUrl}/users`),
        )
    });
  }

  getAll(): Observable<User[]> {
    // console.log('getAll');
    // return of( this.users );
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(userid: number): Observable<User|null>  {
    // const user = this.users.find(user => user.id === userid);
    // if (user) {
    //   console.log('getByID', user);
    //   return of(user);
    // }
    // console.log('getByID', userid, 'not found');
    // return of(null);
    return this.http.get<User>(`${environment.apiUrl}/users/${userid}`);
  }

  update(userid: number, user: IUser): Observable<User | null> {
    // const u = this.users.find(user => user.id === userid);
    // if (u) {
    //   u.firstName = this.pascalCase(user.firstName);
    //   u.lastName = user.lastName.toUpperCase();
    //   console.log('update', userid, u);
    //   return of(u);
    // }
    // console.log('update', userid, 'not found');
    // return of(null)
    if (user) {
      user.firstName = this.pascalCase(user.firstName);
      user.lastName = this.pascalCase(user.lastName);
    }
    return this.http.put<User>(`${environment.apiUrl}/users/${userid}`, user);

  }

  create(user: IUser): Observable<User> {
    // const max = Math.max(...this.users.map(user => user.id)) + 1;
    // const newUser =  new User(max, this.pascalCase(user.firstName), user.lastName.toUpperCase());
    // console.log('create', newUser, this.users);
    // this.users.push(newUser);
    // return of(newUser);
    if (user) {
      user.firstName = this.pascalCase(user.firstName);
      user.lastName = this.pascalCase(user.lastName);
    }
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }

  delete(userid: number): Observable<void> {
    // this.users = this.users.filter(user => user.id !== userid);
    // console.log('delete', userid, this.users);
    // return of(this.users);
    this.queryClient.invalidateQueries({
      queryKey : ['users'],
    })

    return this.http.delete<void>(`${environment.apiUrl}/users/${userid}`);
  }


}
