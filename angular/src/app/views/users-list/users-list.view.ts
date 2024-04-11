import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { UserCardComponent } from '@components/user-card/user-card.component';
import { RouterLink } from '@angular/router';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UpperCasePipe, UserCardComponent, RouterLink],
  templateUrl: './users-list.view.html',
  styleUrl: './users-list.view.scss'
})
export class UsersListView {

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {

  }
  users: string[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      {
        next: (data) => {
          this.users = data;
        },
        error: (error) => {
          this.toastr.error('An error has occured while retrieving users');
          console.error('An error has occured: ', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      }
    );
  }
}
