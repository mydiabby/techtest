import { User } from '@/interfaces/user.interface';
import { UserService } from '@/services/user.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  providers: [MessageService, UserService],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    MessagesModule,
  ],
})
export class UserAddComponent implements OnInit {
  user: User = {};
  submitted: boolean = false;
  userDialog: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {}

  saveUser(user: User) {
    if (!this.user.firstname || !this.user.lastname) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must enter the user details !',
        life: 3000,
      });
    } else {
      this.userService.addUser(user).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.userDialog = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'User Created! You will be redirected in 3 seconds.',
              life: 3000,
            });
            setTimeout(() => {
              this.router.navigate(['/', 'users']);
            }, 3000);
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ooooops!',
            detail: 'Your already have entered your name ;)',
            life: 3000,
          });
        },
      });
    }
  }
}
