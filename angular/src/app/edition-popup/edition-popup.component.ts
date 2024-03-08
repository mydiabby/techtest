import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SharedModule } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { UserData, UserFormData } from '../../types';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edition-popup',
  standalone: true,
  imports: [
    SharedModule,
    ButtonModule,
    DialogModule,
    UserFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edition-popup.component.html',
  styleUrl: './edition-popup.component.scss',
})
export class EditionPopupComponent {
  @Input() isDeletePopup: boolean = false;
  @Input() display: boolean = false;
  @Input() header!: string;
  @Input() user: UserData = {
    firstName: '',
    lastName: '',
  };

  @Output() confirm = new EventEmitter<UserData>();
  @Output() displayChange = new EventEmitter<boolean>();

  constructor(private ref: ChangeDetectorRef) {}

  form = new FormGroup({});

  onDisplay() {
    if (!this.isDeletePopup) {
      this.form.setValue({
        username: {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
        },
      });
    }
  }

  onConfirm() {
    if (!this.isDeletePopup) {
      const { username } = this.form.getRawValue() as UserFormData;
      this.user.lastName = username.lastName ?? this.user.lastName;
      this.user.firstName = username.firstName ?? this.user.firstName;
    }
    this.confirm.emit(this.user);
    this.display = false;
    this.displayChange.emit(this.display);
    this.form.reset();
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
    this.form.reset();
  }

  ngOnInit() {
    this.ref.detectChanges();
  }
}
