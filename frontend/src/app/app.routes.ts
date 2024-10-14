import { Routes } from '@angular/router'
import { ListUsersComponent } from './users/containers/list-users.component'
import { AddUserComponent } from './users/containers/add-user.component'

export const routes: Routes = [
    {
        path: 'users',
        component: ListUsersComponent,
    },
    {
        path: 'users/add',
        component: AddUserComponent
    },
    {
        path: '**',
        redirectTo: '/users'
    }
]
