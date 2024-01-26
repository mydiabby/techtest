import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/add',
    component: UserFormComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
