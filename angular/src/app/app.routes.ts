import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component.page').then(
        (mod) => mod.UsersComponentPage
      ),
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

// route /users  ->  utiliser un resolver pour fetch les users avant le chargement des composants
// users comp + page + store + facade
// users list comp
// add user form comp
