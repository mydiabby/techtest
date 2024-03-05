import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./views/homepage/homepage.component').then((x) => x.HomepageComponent),
        title: 'Accueil'
    },
    {
        path: 'users',
        loadComponent: () => import('./views/user-list/user-list.component').then((x) => x.UserListComponent),
        title: 'Liste des utilisateurs'
    },
    {
        path: 'users/add',
        loadComponent: () => import('./views/users-add/users-add.component').then((x) => x.UsersAddComponent),
        title: 'Ajouter un utilisateur'
    },
    { path: '**', redirectTo: '' }
];
