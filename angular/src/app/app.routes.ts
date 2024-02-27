import { Routes } from '@angular/router';
import { userResolver } from './resolvers/user.resolver';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component.page').then(
        (mod) => mod.UsersComponentPage
      ),
    resolve: { allUsers$: userResolver },
  },
  {
    path: 'users/add',
    loadComponent: () =>
      import('./pages/add-user/add-user.component.page').then(
        (mod) => mod.AddUserComponentPage
      ),
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];
