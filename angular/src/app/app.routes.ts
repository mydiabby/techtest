import { Routes } from '@angular/router';
import { UserListComponent } from './user/user-list.component';


export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: '**', redirectTo: 'users' }
];
