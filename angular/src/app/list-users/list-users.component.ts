import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../user.service';

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
    this.userService.getUsers().subscribe(
      response => {
        this.userList = response
        console.log("List recupérée avec succes!", response)
      },
      error => {
        console.error('Error retrieving the users list', error)
      }
    )
  
  }
}