import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from '@core/component/base-form.component';

@Component({
    standalone: true,
    selector: 'app-user-create-form',
    templateUrl: './user-create-form.component.html',
    imports: [ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCreateFormComponent extends BaseFormComponent {
    get firstName() {
        return this.formGroup.get('firstName');
    }

    get lastName() {
        return this.formGroup.get('lastName');
    }
}