import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  open(text: string, status: 'success' | 'error', duration = 2500) {
    const snackBarRef = this._snackBar.openFromComponent(ToastComponent, {
      duration: status === 'success' ? duration : 2 * duration,
      data: {
        text: text,
        class: 'toast-' + status
      },
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });

    return snackBarRef;
  }

  defaultError() {
    this.open('Une erreur est survenue.', 'error');
  }
}
