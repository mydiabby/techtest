import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UpperCasePipe } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUserDTO } from '../../interfaces/create-user-dto';
import { UserService } from '../../services/user.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
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

  ngOnInit(): void {
  }

  onSubmit() {
    this.createUserDTO = this.userAddForm.value;
    this.userService.addUser(this.createUserDTO).subscribe(
      {
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error('An error has occured: ', error);
        },
        complete: () => {
          console.log("fini")
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
