import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-user-already-exist',
  templateUrl: './modal-user-already-exist.component.html',
  styleUrl: './modal-user-already-exist.component.scss'
})
export class ModalUserAlreadyExistComponent {

  public message = this.data;

  constructor(
    private readonly modal: MatDialogRef<ModalUserAlreadyExistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  public close() {
    this.modal.close();
  }
}
