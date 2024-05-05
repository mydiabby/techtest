import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-base-form',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseFormComponent implements OnInit {
    private readonly formGroupDirective = inject(FormGroupDirective);

    public formGroup: FormGroup<any>;
    
    ngOnInit() {
        this.formGroup = this.formGroupDirective.form;
    }
}
