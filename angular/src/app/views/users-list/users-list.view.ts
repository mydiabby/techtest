import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UpperCasePipe } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UpperCasePipe, UserCardComponent, RouterLink],
  templateUrl: './users-list.view.html',
  styleUrl: './users-list.view.scss'
})
export class UsersListView {

  constructor(private userService: UserService) {

  }
  users: User[] = [];
  isLoading: boolean = true;

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      {
        next: (data) => {
          this.users = data;
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      }
    );
  }
}
