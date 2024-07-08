import { Routes } from '@angular/router';
import {ListUsersComponent} from './list-users/list-users.component'
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
    {path:'users', component: ListUsersComponent},
    {path:'users/add', component:AddUserComponent}
];
