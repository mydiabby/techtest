import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users/users.component').then(m => m.UsersComponent),
  },
  {
    path: 'users/add',
    loadComponent: () =>
      import('./user-add/user-add.component').then(m => m.UserAddComponent),
  },
];
