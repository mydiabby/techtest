import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'myDiabby',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'users',
    title: 'Utilisateurs - myDiabby',
    loadComponent: () =>
      import('./pages/users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'users/add',
    title: 'Ajouter un utilisateur - myDiabby',
    loadComponent: () =>
      import('./pages/add-user/add-user.component').then(
        (m) => m.AddUserComponent,
      ),
  },
];
