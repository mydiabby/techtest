import { Component } from '@angular/core';
import {LayoutComponent} from "../../ui/layout/layout.component";
import {UsersComponent} from "../../features/users/client/users.component";
import {UserCreationComponent} from "../../features/user-creation/client/user-creation.component";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    LayoutComponent,
    UsersComponent,
    UserCreationComponent
  ],
  templateUrl: './add-user-page.component.html',
  styleUrl: './add-user-page.component.scss'
})
export class AddUserPageComponent {

}
