import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInputModule  } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule,MatFormFieldModule

  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  userData = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  })

  constructor(private postService:UserService){}

  createPost(){
    const formData = this.userData.value;
    this.postService.createPost(formData).subscribe(
      response => {
        console.log('User créé avec succès!', response)
      },
      error => {
        console.error("Erreur dans le post",error)
      }
    )
  }
}
