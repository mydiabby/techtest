import { Component, Input, inject } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, FieldsetModule, InputTextModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';

  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  get formControl(): { [key: string]: AbstractControl } {
    const formGroup = this.parentFormGroup.controls[
      this.controlKey
    ] as FormGroup;
    return formGroup.controls;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormGroup({
        firstName: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(
              "^(?:[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ' -]{1,}|[a-zA-ZÀ-ÿ]+)$",
            ),
          ]),
        ),
        lastName: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(
              "^(?:[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ' -]{1,}|[a-zA-ZÀ-ÿ]+)$",
            ),
          ]),
        ),
      }),
    );
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
