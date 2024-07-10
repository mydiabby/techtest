import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../post.service';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [

  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {
  
  
  userList: User[] = []

  constructor (private userService:UserService){}


  ngOnInit(): void {
    this.userList = this.userService.getUsers()}
}