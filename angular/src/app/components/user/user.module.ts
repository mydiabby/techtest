import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserFormComponent } from './user-form/user-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUserAlreadyExistComponent } from '../../shared/components/modal-user-already-exist/modal-user-already-exist.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    UsersListComponent,
    UserFormComponent,
    ModalUserAlreadyExistComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatListModule
  ],
})
export class UserModule {}
