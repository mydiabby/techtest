import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AppComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  user: User = {};
  submitted: boolean = false;
  userDialog: boolean = false;

  constructor() {}

  ngOnInit() {}

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedProducts() {}
  saveUser() {}
  deleteUser(user: User) {}
  editUser(user: User) {}
}
