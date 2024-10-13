import { Component } from '@angular/core';
import {LayoutComponent} from "../../ui/layout/layout.component";
import {UsersComponent} from "../../features/users/client/users.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    LayoutComponent,
    UsersComponent
  ],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss'
})
export class UsersListPageComponent {}
