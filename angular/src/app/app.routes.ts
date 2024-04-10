import { Routes } from '@angular/router';
import { UsersListView } from './views/users-list/users-list.view';
import { UsersAddView } from './views/users-add/users-add.view';
import { NotFoundView } from './views/not-found/not-found.view';

export const routes: Routes = [
    {
        path: 'users', children: [
            {
                path: '',
                component: UsersListView
            },
            {
                path: 'add',
                component: UsersAddView
            }
        ]
    },
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: '**', component: NotFoundView }
];
