import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInputModule  } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule,MatFormFieldModule

  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
  })
  handleSubmit () {
    console.log(this.userForm.value)
  }
  get emailFormControl() {
    return this.userForm.get('email');
  }
}
