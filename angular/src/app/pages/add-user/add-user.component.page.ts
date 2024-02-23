import { Component } from '@angular/core';
import { AddUserComponent } from '../../components/add-user/add-user.component';

@Component({
  selector: 'app-add-user-page',
  standalone: true,
  imports: [AddUserComponent],
  templateUrl: './add-user.component.page.html',
  styleUrl: './add-user.component.page.css'
})
export class AddUserComponentPage {

}
