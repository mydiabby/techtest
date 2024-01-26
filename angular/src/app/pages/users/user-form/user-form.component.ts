import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, signal } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { EMPTY, Observable, catchError, interval, take, timer } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';
import { CreateUser, SetError, SetFirstName, SetLastName } from './state/add-user.actions';
import { AddUserSelectors } from './state/add-user.selectors';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FlexLayoutModule,
    CommonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIcon,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  @Select(AddUserSelectors.isLoading)
  isLoading$: Observable<boolean>;

  @Select(AddUserSelectors.hasError)
  hasError$: Observable<string>;

  @Select(AddUserSelectors.firstName)
  firstName$: Observable<string>;

  @Select(AddUserSelectors.lastName)
  lastName$: Observable<string>;

  userForm: FormGroup = new FormGroup({});
  firstNameControl = new FormControl('firstNameControl', [Validators.required]);
  lastNameControl = new FormControl('lastNameControl', [Validators.required])

  error: string = '';
  success: boolean = false;

  readonly redirectionDelay: number = 4;
  readonly redirectionInterval: number = 1000; // 1s
  redirectionCounter = signal<number>(4);

  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store,
    private readonly _router: Router,
    private readonly _toastService: ToastService,
  ){
    effect(() => {
      if(this.redirectionCounter() === 0) {
        this.backToUserList();
      }
    });
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({});
    this.userForm.addControl('firstName', this.firstNameControl);
    this.userForm.addControl('lastName', this.lastNameControl);

    this.firstName$.subscribe(firstName => {
      this.firstNameControl.setValue(firstName);
    });

    this.lastName$.subscribe(lastName => {
      this.lastNameControl.setValue(lastName);
    });
  }

  setFirstName(event: Event) {
    this._store.dispatch(new SetFirstName((event.target as HTMLInputElement).value));
  }

  setLastName(event: Event) {
    this._store.dispatch(new SetLastName((event.target as HTMLInputElement).value));
  }

  onSubmitUser() {
    if(this.userForm.invalid) {
      return;
    }

    this._store.dispatch(new CreateUser(this.userForm.value)).pipe(
      catchError((error) => {
        this._toastService.open(`Une erreur ${error.status} est survenue.`, 'error');
        return EMPTY;
      })
    ).subscribe();

    this._actions$.pipe(
      ofActionSuccessful(SetError)
    ).subscribe(({error}): void => {
      this.error = error;
    });

    this._actions$.pipe(
      ofActionSuccessful(CreateUser)
    ).subscribe((): void => {
      this.success = true;
      this._toastService.open(`L'utilisateur a été ajouté avec succès.`, 'success');

      this.firstNameControl.disable();
      this.lastNameControl.disable();

      this.redirectionCounter.set(this.redirectionDelay);

      const interval$ = interval(this.redirectionInterval);
      const delay$ = interval$.pipe(take(this.redirectionDelay));
      delay$ .subscribe(() => {
        this.redirectionCounter.update(prev => prev - 1);
      });
      timer((this.redirectionInterval*this.redirectionDelay)).subscribe();
    });
  }

  backToUserList() {
    this._router.navigate(['users']);
  }
}
