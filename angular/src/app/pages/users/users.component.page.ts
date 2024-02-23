import { Component } from '@angular/core';
import { UsersComponent } from '../../components/users/users.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UsersComponent],
  templateUrl: './users.component.page.html',
  styleUrl: './users.component.page.css'
})
export class UsersComponentPage {

}
