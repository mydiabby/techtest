import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../core/ports/user.port';
import { CreateUserDto } from '../../core/dto/create-user.dto';
import { catchError, tap } from 'rxjs';

@Component({
    selector: 'app-users-add',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule
    ],
    templateUrl: './users-add.component.html',
    styleUrl: './users-add.component.css'
})
export class UsersAddComponent {

    private userService = inject(UserService);
    private formBuilder = inject(FormBuilder);
    private snackBar = inject(MatSnackBar);

    addUserForm: FormGroup = this.formBuilder.nonNullable.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
    });

    isLoading = signal(false);
    firstnameErrorMessage = signal(this.addUserForm.get('firstname')?.hasError('required') ? 'You must enter a value' : '');
    lastnameErrorMessage = signal(this.addUserForm.get('firstname')?.hasError('required') ? 'You must enter a value' : '');

    onSubmit() {
        this.isLoading.set(true);
        const newUser: CreateUserDto = { ...this.addUserForm.value };
        this.userService.addOne(newUser).pipe(
            catchError(err => {
                this.isLoading.set(false);
                this.openSnackBar('Echec de l\'enregistrement');
                throw err;
            }),
            tap(() => {
                this.isLoading.set(false);
                this.openSnackBar('L\'utilisateur a bien été créé');
                this.addUserForm.reset();
            })
        ).subscribe();
    }

    private openSnackBar(message: string) {
        this.snackBar.open(message, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000
        });
    }

}
