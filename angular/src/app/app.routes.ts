import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'users/add',
    loadComponent: () =>
      import('./pages/add-user/add-user.component').then(
        (m) => m.AddUserComponent,
      ),
  },
];
