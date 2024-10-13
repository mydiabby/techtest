import { Routes } from '@angular/router';
import {HomePageComponent} from "../../pages/home/home-page.component";
import {UsersListPageComponent} from "../../pages/users-list/users-list-page.component";
import {AddUserPageComponent} from "../../pages/add-user/add-user-page.component";

export const routes: Routes = [
  {path: 'users', component: UsersListPageComponent},
  {path: 'users/add', component: AddUserPageComponent},
  {path: '', component: HomePageComponent}
];
