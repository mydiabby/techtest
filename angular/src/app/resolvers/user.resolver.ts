import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersFacade } from '../facades/users.facade';

export const userResolver: ResolveFn<Observable<void>> = () => {
  return inject(UsersFacade).fetchAllUsers$();
};
