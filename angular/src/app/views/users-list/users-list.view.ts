import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UpperCasePipe } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UpperCasePipe, UserCardComponent, RouterLink],
  templateUrl: './users-list.view.html',
  styleUrl: './users-list.view.scss'
})
export class UsersListView {
  users: User[] = [
    { id: 1, lastname: 'Hi', firstname: 'Maya' },
    { id: 2, lastname: 'Hou', firstname: 'Maya' },
    { id: 2, lastname: 'Ha', firstname: 'Maya' },
    { id: 4, lastname: 'Haha', firstname: 'Maya' },
  ];
}
