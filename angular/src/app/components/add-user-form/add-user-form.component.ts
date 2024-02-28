import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WORDING } from '../../../assets/wording';
import { User } from '../../http/users.model';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.css',
})
export class AddUserFormComponent {
  @Output() userFormValue: EventEmitter<User> = new EventEmitter();
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, Validators.required],
    });
  }

  submitUser(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userFormValue.emit(this.userForm.value);
    } else {
      console.log('Pas possible');
    }
  }

  protected readonly WORDING = WORDING;
}
