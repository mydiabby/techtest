import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export interface RequestOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export type UserFormData = {
  username: UserData;
};

export type CommonData = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
};

export interface UserData extends CommonData {
  firstName: string;
  lastName: string;
}

export interface UpdatedUserData
  extends Omit<UserData, 'id' | 'createdAt' | 'updatedAt'> {}

interface ResponseShape<T> {
  data: T;
}

export interface UserDataResponse extends ResponseShape<UserData> {}

export interface UsersDataResponse
  extends ResponseShape<[UserData[], { count: number }]> {}

export interface UserResponse extends ResponseShape<string> {}

export interface UsersResponse
  extends ResponseShape<[string[], { count: number }]> {}

export interface SortCriteria {
  property: string; // Property to sort by
  direction: 'ASC' | 'DESC'; // Sort direction (Ascending or Descending)
}

export interface QueryParams {
  // Key-value pair representing any query parameter
  // Example: { limit: 10, offset: 2, orderBy: 'lastName:ASC,id:DESC,createdAt:DESC' }
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
}
