import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UserFormComponent } from '../user-form/user-form.component';
import { SharedModule } from '../shared/shared.module';
import { UserData, UserFormData } from '../../types';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [SharedModule, ButtonModule, UserFormComponent, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss',
})
export class UserAddComponent {
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private toastService: ToastService,
    private ref: ChangeDetectorRef,
  ) {}

  user: UserData = {
    firstName: '',
    lastName: '',
  };
  form = new FormGroup({});

  onSubmit() {
    const { username } = this.form.getRawValue() as UserFormData;
    this.user.lastName = username.lastName ?? this.user.lastName;
    this.user.firstName = username.firstName ?? this.user.firstName;
    this.addUser(this.user);
  }

  addUser(user: UserData) {
    this.userService
      .addUser(`${this.apiService.API_URL}/users`, user)
      .subscribe({
        next: data => {
          this.toastService.showToast(
            'success',
            'Creation Successful',
            'The user has been successfully created',
            'bc',
            1500,
          );
        },
        error: err => {
          let errorMessage = err.error.exceptionResponse;
          if (typeof errorMessage !== 'string') {
            errorMessage = errorMessage.message.toString();
          }
          this.toastService.showToast(
            'error',
            'Creation Failed',
            `Something went wrong: ${errorMessage}`,
            'bc',
            1500,
          );
        },
      });
  }

  ngOnInit() {
    this.ref.detectChanges();
  }
}
