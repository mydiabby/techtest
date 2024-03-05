import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  QueryParams,
  UpdatedUserData,
  UserData,
  UserDataResponse,
  UsersDataResponse,
} from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  dataPossiblyChanged$ = new BehaviorSubject<boolean | null>(null);

  constructor(private apiService: ApiService) {
    this.dataPossiblyChanged$.next(true);
  }

  getUsers = (
    url: string,
    params: QueryParams,
  ): Observable<UsersDataResponse> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  addUser = (url: string, body: UserData): Observable<UsersDataResponse> => {
    this.dataPossiblyChanged$.next(true);
    return this.apiService.post(url, body, {});
  };

  editUser = (url: string, body: UserData): Observable<UserDataResponse> => {
    return this.apiService.patch(url, body, {});
  };

  deleteUser = (url: string): Observable<UserDataResponse> => {
    return this.apiService.delete(url, {});
  };
}
