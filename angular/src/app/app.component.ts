import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, MessageService, UserService],
})
export class AppComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  user: User = {};
  submitted: boolean = false;
  userDialog: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private config: PrimeNGConfig,
  ) {}

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
    this.userDialog = true;
  }

  deleteSelectedUsers() {}
  saveUser(user: User) {
    console.log('🚀 ~ AppComponent ~ saveUser ~ user:', user);
    this.userService.addUser(user).subscribe((response: any) => {
      if (response.success) {
        this.userDialog = false;
        this.fetchUsers();
      }
    });
  }
  deleteUser(user: User) {}
  editUser(user: User) {}
}
