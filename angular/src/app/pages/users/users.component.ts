import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

import {
  GetUsersOptions,
  SortableField,
  SortDirection,
  User,
  UserService,
} from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);

  @ViewChild(MatSort) sort!: MatSort;

  users: User[] = [];
  loading = true;
  errorMessage: string | null = null;
  displayedColumns = ['firstName', 'lastName'];

  ngOnInit() {
    this.fetchUsers();
  }

  onSortChange(sort: Sort) {
    this.fetchUsers({
      sortBy: sort.active as SortableField,
      sortDir: sort.direction as SortDirection,
    });
  }

  private fetchUsers(options: GetUsersOptions = {}) {
    this.userService.getUsers(options).subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.errorMessage =
          'Impossible de récupérer la liste des utilisateurs.';
        this.loading = false;
      },
    });
  }
}
