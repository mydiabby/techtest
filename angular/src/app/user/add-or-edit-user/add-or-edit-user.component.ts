import {Component, Inject} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {User} from "../../models/user.model";
import {MatIconButton} from "@angular/material/button";


@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIcon,
    MatIconButton
  ],
  selector: "user-add",
  templateUrl: "./add-or-edit-user.component.html",
  styleUrls: ["./add-or-edit-user.component.css"]
})
export class UserAddComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<UserAddComponent>, @Inject(MAT_DIALOG_DATA) public user: User) {
    const {id, firstName, lastName} = this.user ?? { id: null, firstName: '', lastName: '' };
    this.userForm = this.fb.group({
      id: [id],
      firstName: [
        firstName || '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern("^[a-zA-Z]+$")]
      ],
      lastName: [
        lastName || ' ',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern("^[a-zA-Z]+$")]
      ]
    });
  }

  get firstName() {
    return this.userForm.get("firstName");
  }

  get lastName() {
    return this.userForm.get("lastName");
  }

  close() {
   this.dialogRef.close();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
