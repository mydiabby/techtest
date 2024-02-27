import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { WORDING } from '../../../assets/wording';
import { User } from '../../http/users.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  @Input() usersList: User[];
  displayedColumns: string[] = ['firstName', 'lastName', 'id'];

  constructor() {
    this.usersList = [];
  }

  protected readonly WORDING = WORDING;
}
