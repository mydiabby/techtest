import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UsersListComponent } from '../users-list/users-list.component';
import {WORDING} from "../../../assets/wording";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    UsersListComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  usersListData = [
    {
      lastName: 'Billy',
      firstName: 'Jackson',
      id: 1,
    },
    {
      lastName: 'Tony',
      firstName: 'Hawk',
      id: 2,
    },
    {
      lastName: 'Michael',
      firstName: 'Stewart',
      id: 3,
    },
    {
      lastName: 'Lauren',
      firstName: 'Sparkson',
      id: 4,
    },
  ];

  protected readonly WORDING = WORDING;
}
