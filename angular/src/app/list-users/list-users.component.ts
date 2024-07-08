import { Component, OnInit } from '@angular/core';


export type User = {
  id:string,
  firstName:string,
  lastName:string,
  email:string
}

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

  async getUsers (): Promise<User[]> {
    // TODO: use services.
    try {
      const response = await fetch ("http://localhost:3000/users") // env v
      const users = await response.json()

      return users as User[]
    } catch (e) {
      console.log("e", e)
    }
    return []
  }

  ngOnInit(): void {
    this.getUsers().then((res: User[]) => {
      this.userList = res
      console.log(this.userList)
    })}
}