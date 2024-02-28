import { Component, EventEmitter, Output } from '@angular/core';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { WORDING } from '../../../assets/wording';
import { User } from '../../http/users.model';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [AddUserFormComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  @Output() userFormValue: EventEmitter<User> = new EventEmitter();

  emitUserFormValue(userFormValue: User) {
    this.userFormValue.emit(userFormValue);
  }
  protected readonly WORDING = WORDING;
}
