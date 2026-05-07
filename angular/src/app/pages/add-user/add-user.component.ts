import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../services/user.service';
import { UserErrorCode } from '../../services/user-error-codes';
import { ControlErrorPipe } from '../../pipes/control-error.pipe';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ControlErrorPipe,
  ],
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {
  private formBulder = inject(FormBuilder);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  submitting = false;
  errorMessage: string | null = null;

  form = this.formBulder.nonNullable.group({
    firstName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
  });

  submit() {
    if (this.form.invalid || this.submitting) return;

    const firstName = this.form.controls.firstName.value.trim();
    const lastName = this.form.controls.lastName.value.trim();

    if (firstName.length < 2 || lastName.length < 2) {
      this.form.controls.firstName.setValue(firstName);
      this.form.controls.lastName.setValue(lastName);
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = null;

    this.userService.createUser(firstName, lastName).subscribe({
      next: () => {
        this.snackBar.open('Utilisateur ajouté avec succès.', 'Fermer', {
          duration: 5000,
        });
        this.router.navigate(['/users']);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting = false;
        const code = err.error?.code;
        if (code === UserErrorCode.UserAlreadyExists) {
          this.errorMessage = 'Cet utilisateur existe déjà.';
        } else {
          this.errorMessage = "Une erreur est survenue lors de l'ajout.";
        }
      },
    });
  }
}
