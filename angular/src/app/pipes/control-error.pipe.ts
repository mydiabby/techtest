import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'controlError',
  standalone: true,
  pure: false,
})
export class ControlErrorPipe implements PipeTransform {
  transform(
    control: AbstractControl | null,
    label = 'Ce champ',
  ): string | null {
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) {
      return `${label} est requis.`;
    }
    if (control.errors['minlength']) {
      const min = control.errors['minlength'].requiredLength;
      return `${label} doit contenir au moins ${min} caractères.`;
    }
    return null;
  }
}
