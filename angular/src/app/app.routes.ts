import { Routes } from '@angular/router';
import { UserListComponent } from './views/user-list/user-list.component';

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
    ],
  },
];
