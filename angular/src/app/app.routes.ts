import { Routes } from '@angular/router';
import { UserListComponent } from './views/user-list/user-list.component';
import { UserAddComponent } from './views/user-add/user-add.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    children: [
      {
        path: '',
        title: 'User list',
        component: UserListComponent,
      },
      {
        path: 'add',
        title: 'User add',
        component: UserAddComponent,
      },
    ],
  },
];
