import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { MenuComponent } from './menu/menu.component';
import { UserAddEditComponent } from './user-addedit/user-addedit.component';

export const routes: Routes = [
  { path: '', component: MenuComponent},
  { path: 'users', component: UsersComponent},
  { path: 'users/add', component: UserAddEditComponent},
  { path: 'user/:id', component: UserAddEditComponent},
];
