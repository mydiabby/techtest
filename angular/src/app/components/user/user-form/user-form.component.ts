import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/users.service';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalUserAlreadyExistComponent } from '../../../shared/components/modal-user-already-exist/modal-user-already-exist.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  public userForm!: UntypedFormGroup;

  constructor(
    private readonly userService: UserService, 
    private readonly fb: UntypedFormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/)],
      ]
    });
  }

  get firstName() {
    return this.userForm.controls['firstName'];
  }

  get lastName() {
    return this.userForm.controls['lastName'];
  }
  
  public onSubmit(): void {
    if (this.userForm.valid) {
      const lastName = this.userForm.value.lastName;
      const firstName = this.userForm.value.firstName;
      this.userService.addUsers({lastName, firstName}).pipe(
        tap((res) => {
          this.openModal('L\'utilisateur a été ajouté avec succès !');
        })
      ).subscribe({
        error: (error: HttpErrorResponse) => {
          this.openModal(error.error.message)
        },
      });
    }
  }

  private openModal(message: string): void {
    this.dialog.open(ModalUserAlreadyExistComponent, {
      width: '400px',
      height: '100px',
      data: message
    });
  }

}
