import { Component, Input, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {WORDING} from "../../../assets/wording";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  @Input() usersListData: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'id'];
  
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.usersListData);
  }

  protected readonly WORDING = WORDING;
}
