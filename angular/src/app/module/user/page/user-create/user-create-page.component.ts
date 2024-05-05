import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDirective } from '@core/directive/form.directive';
import { FormButtonsComponent } from '@ui/m-form-buttons/form-buttons.component';
import { UserCreateFormComponent } from '@user/ui/o-user-create-form/user-create-form.component';
import { UserCreateto } from '@user/user.model';
import { UserService } from '@user/user.service';
import { Router } from '@angular/router';
import { CardContainerComponent } from '@ui/m-card-container/card-container.component';

@Component({
    standalone: true,
    selector: 'app-user-create-page',
    templateUrl: './user-create-page.component.html',
    imports: [CardContainerComponent, FormButtonsComponent, FormDirective, ReactiveFormsModule, UserCreateFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCreatePageComponent {
    private readonly formBuilder = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly userService = inject(UserService);
    private readonly toastService = inject(ToastrService);

    public userCreateBusy = signal(false);
    public userCreateForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
    });

    public onSubmit(): void {
        if (this.userCreateForm.invalid) return;
        this.userCreateBusy.set(true);
        this.userService.createUser(this.userCreateForm.value as UserCreateto)
            .pipe(finalize(() => (this.userCreateBusy.set(false))))
            .subscribe(() => {
                this.toastService.success("L'utilisateur a été créé avec succès.");
                this.router.navigateByUrl('/users');
            });
    }
}
