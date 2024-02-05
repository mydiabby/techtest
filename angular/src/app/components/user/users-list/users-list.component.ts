import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/users.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  public users!: string[];

  constructor(private readonly userService: UserService, protected readonly router: Router) {

  }

  ngOnInit(): void {
    this.getUserLists();
  }

  private getUserLists() {
    this.userService.getUsers().pipe(
      tap((res) => {
        this.users = res;
      })
    ).subscribe();
  }
}
