import { Route } from '@angular/router';

export const routes: Route[] = [
    { 
        path: 'users',
        loadComponent: () => import('./module/user/page/users/users-page.component').then((x) => x.UsersPageComponent), 
    },
    { 
        path: 'user/create',
        loadComponent: () => import('./module/user/page/user-create/user-create-page.component').then((x) => x.UserCreatePageComponent), 
    },
    { path: '**', redirectTo: '/users' },
];
