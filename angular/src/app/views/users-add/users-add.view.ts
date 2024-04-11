import { Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { UserCardComponent } from '@components/user-card/user-card.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUserDTO } from '@interfaces/create-user-dto';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-add',
  standalone: true,
  imports: [UpperCasePipe, UserCardComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './users-add.view.html',
  styleUrl: './users-add.view.scss'
})
export class UsersAddView {
  userAddForm: FormGroup;
  createUserDTO: CreateUserDTO;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.userAddForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
    });

    this.createUserDTO = {
      firstName: "",
      lastName: ""
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.createUserDTO = this.userAddForm.value;
    this.userService.addUser(this.createUserDTO).subscribe(
      {
        next: () => {
          this.toastr.success('User successfully created !');
          this.userAddForm.reset();
          setTimeout(() => {
            this.router.navigate(['/users']);
          },
            3000);
        },
        error: (error) => {
          switch (error.status) {
            case 400:
              this.toastr.error('User already exist');
              break;
            default:
              this.toastr.error('An error has occured');
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

  get firstName() {
    return this.userAddForm.get('firstName');
  }

  get lastName() {
    return this.userAddForm.get('lastName');
  }

}
