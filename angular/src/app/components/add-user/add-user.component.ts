import { Component } from '@angular/core';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { WORDING } from '../../../assets/wording';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [AddUserFormComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  protected readonly WORDING = WORDING;
}
