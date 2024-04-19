import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { UserGateway } from '../../core/ports/user.gateway';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PostUserDto } from '../../core/models/dto/post-user.dto';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAddComponent {
  userGateway = inject(UserGateway);
  formBuilder = inject(FormBuilder);
  changeDetectorRef = inject(ChangeDetectorRef);
  router = inject(Router);

  isLoading = false;
  fullNameAlreadyUsed = false;
  emptyInputs = {
    firstName: false,
    lastName: false,
  };
  firstNameEmpty = false;
  lastNameEmpty = false;
  dto: PostUserDto = { firstName: '', lastName: '' };

  userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  firstName = this.userForm.controls.firstName;
  lastName = this.userForm.controls.lastName;

  onSubmit() {
    this.isLoading = true;
    this.fullNameAlreadyUsed = false;
    this.dto = Object.assign(this.userForm.value);
    this.userGateway.post(this.dto).subscribe(
      {
        next: () => {
          this.router.navigate(['users']);
        },
        error: (e) => {
          switch (e.status) {
            case HttpStatusCode.BadRequest:
              for (const message of e.error.message) {
                this.emptyInputs = { ...this.emptyInputs, [message.field]: true };
              }
              this.changeDetectorRef.detectChanges();
              break;
            case HttpStatusCode.Conflict:
              this.fullNameAlreadyUsed = true;
              this.changeDetectorRef.detectChanges();
              break;
            default:
              break;
          }
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      }
    );
  }

  resetBooleanErrors() {
    this.fullNameAlreadyUsed = false;
    this.emptyInputs = {
      firstName: false,
      lastName: false,
    };
    this.changeDetectorRef.detectChanges();
  }
}
