import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgClass } from '@angular/common';
import { User } from '@app/models/user';
import { Observable } from 'rxjs';

import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-addedit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, RouterLink, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './user-addedit.component.html',
  styleUrl: './user-addedit.component.css'
})
export class UserAddEditComponent implements OnInit {
    form!: FormGroup;
    id?: number;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    matcher = new MyErrorStateMatcher();

    errorMessage = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private usersService: UserService
    ) { }

    ngOnInit() {
        try {
          this.id = parseInt(this.route.snapshot.params['id']);
        } catch (e) {
          console.log("given userid is invalid for edition");
          this.id = 0;
        }

        // form with validation rules
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
        });

        this.title = 'Ajout d\'un utilisateur';
        if (this.id) {
            // edit mode
            this.title = 'Edition d\'un utilisateur';
            this.loading = true;
            this.usersService.getById(+this.id).subscribe(user => {
                  if (user) {
                    this.form.patchValue(user);
                  }
                  this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // // reset alerts on submit
        // this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveUser()
            .subscribe(
                () => {
                    // this.alertService.success('Utilisateur sauvegardé', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/users');
                    this.errorMessage = '';
                }
                , error => {
                    console.log(error);
                    if (error.status === 400) {
                      if (error?.error?.message.includes('duplicate key')) {
                        this.errorMessage = 'Un utilisateur existe dèja avec le même nom et prénom !';
                      }
                    } else {
                      this.errorMessage = error.message;
                    }
                    // this.alertService.error(error);
                    this.submitting = false;
                }
            )
    }

    private saveUser(): Observable<User |null> {
        // create or update user based on id param
        return this.id
            ? this.usersService.update(this.id, this.form.value)
            : this.usersService.create(this.form.value);
    }
}
