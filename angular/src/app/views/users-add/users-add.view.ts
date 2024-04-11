import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { UpperCasePipe } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDTO } from '../../interfaces/user-dto';

@Component({
  selector: 'app-users-add',
  standalone: true,
  imports: [UpperCasePipe, UserCardComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './users-add.view.html',
  styleUrl: './users-add.view.scss'
})
export class UsersAddView {
  userAddForm: FormGroup;
  userDTO: UserDTO = {
    firstName: '',
    lastName: ''
  }

  constructor(private formBuilder: FormBuilder) {
    this.userAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.userAddForm.value);
  }

  get firstName() {
    return this.userAddForm.get('firstName');
  }

  get lastName() {
    return this.userAddForm.get('lastName');
  }

}
