import { Routes } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: 'users', component: UsersComponent }, // Route par défaut
  { path: 'users/add', component: UserAddComponent }, // Route pour ajouter un utilisateur
  { path: '**', redirectTo: '' }, // Redirection pour les routes inconnues
];