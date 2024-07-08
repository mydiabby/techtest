import { Component, OnInit } from '@angular/core';


type User = {
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

  ngOnInit(): void { // = useEffect en react 
      this.getUsers().then((res: User[]) => {
        this.userList = res
      })
  }

  async getUsers (): Promise<User[]> {
    // use services.
    try {
      const response = await fetch ("http://localhost:3000/users") 
      const users = await response.json()
      console.log("users",users)
      return users?.body as User[]
    } catch (e) {
      console.log("e", e)
    }
    return []
  }

}
