import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { WORDING } from '../../../assets/wording';
import { User } from '../../http/users/users.model';
import { AddUserErrorMessageComponent } from '../add-user-error-message/add-user-error-message.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [AddUserFormComponent, AddUserErrorMessageComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  @Input() showErrorMessage: boolean;
  @Output() userFormValue: EventEmitter<User> = new EventEmitter();

  constructor() {
    this.showErrorMessage = false;
  }

  emitUserFormValue(userFormValue: User) {
    this.userFormValue.emit(userFormValue);
  }
  protected readonly WORDING = WORDING;
}
