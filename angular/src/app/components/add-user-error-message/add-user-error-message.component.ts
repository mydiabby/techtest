import { Component } from '@angular/core';
import { WORDING } from '../../../assets/wording';

@Component({
  selector: 'app-add-user-error-message',
  standalone: true,
  imports: [],
  templateUrl: './add-user-error-message.component.html',
  styleUrl: './add-user-error-message.component.css'
})
export class AddUserErrorMessageComponent {
  protected readonly WORDING = WORDING;
}
