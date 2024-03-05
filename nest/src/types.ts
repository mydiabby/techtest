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
