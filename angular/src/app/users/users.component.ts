import { Component } from '@angular/core';
import { UsersTableComponent } from '../users-table/users-table.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {}
