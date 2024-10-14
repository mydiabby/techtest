import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'

export type SubmitEvent = Readonly<{
    firstname: string
    lastname: string
}>

type AddUserForm = {
    firstname: FormControl<string|null>
    lastname: FormControl<string|null>
}

const notBlank: ValidatorFn = control => {
    if (typeof control.value !== 'string')
        return { 'not-a-string': control.value }

    if (control.value.trim().length === 0)
        return { 'blank': control.value }

    return null
}

@Component({
    selector: 'app-add-user-form',
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    template: `
        <form [formGroup]="form" (ngSubmit)="submit()">
            <mat-form-field>
                <mat-label>Nom</mat-label>
                <input matInput formControlName="lastname" required>
                @if (form.controls.lastname.touched && form.controls.lastname.invalid) {
                    <mat-error>Le nom fourni est invalide.</mat-error>
                }
            </mat-form-field>
            <mat-form-field>
                <mat-label>Prénom</mat-label>
                <input matInput formControlName="firstname" required>
                @if (form.controls.firstname.touched && form.controls.firstname.invalid) {
                    <mat-error>Le prénom fourni est invalide.</mat-error>
                }
            </mat-form-field>
            <button mat-flat-button type="submit" [disabled]="form.invalid || disabled">Ajouter l'utilisateur</button>
        </form>
    `,
    styles: [
        `form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }`
    ]
})
export class AddUserFormComponent implements OnInit {

    @Input()
    disabled = false
    
    @Output()
    readonly submitted = new EventEmitter<SubmitEvent>()

    form!: FormGroup<AddUserForm>

    ngOnInit(): void {
        this.form = new FormGroup({
            firstname: new FormControl('', notBlank),
            lastname: new FormControl('', notBlank)
        })
    }

    submit(): void {
        this.submitted.emit({
            firstname: this.form.controls.firstname.value!,
            lastname: this.form.controls.lastname.value!
        })
    }
}