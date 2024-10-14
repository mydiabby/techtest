import { User } from '@/interfaces/user.interface';
import { UserService } from '@/services/user.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService, UserService],
  imports: [CommonModule, FormsModule, TableModule, DialogModule, ButtonModule],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  user: User = {};
  submitted: boolean = false;
  userDialog: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response.data;
    });
  }

  openNew() {
    this.user = {};
    this.submitted = false;
  }

  deleteSelectedUsers() {}
  saveUser(user: User) {
    this.userService.addUser(user).subscribe((response: any) => {
      if (response.success) {
        this.userDialog = false;
        this.fetchUsers();
      }
    });
  }
  deleteUser(user: User) {}
  editUser(user: User) {}
  addUserLink() {
    this.router.navigate(['/users/add']);
  }
}
