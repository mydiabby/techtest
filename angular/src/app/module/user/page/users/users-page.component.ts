import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormDirective } from '@core/directive/form.directive';
import { ButtonSecondaryDirective } from '@ui/a-button/button-secondary.directive';
import { CardContainerComponent } from '@ui/m-card-container/card-container.component';
import { UsersListComponent } from '@user/ui/o-users-list/users-list.component';
import { UserService } from '@user/user.service';

@Component({
    standalone: true,
    selector: 'app-users-page',
    templateUrl: './users-page.component.html',
    imports: [AsyncPipe, ButtonSecondaryDirective, CardContainerComponent, FormDirective, NgIf, RouterModule, UsersListComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPageComponent {
    private readonly userService = inject(UserService);

    public users$ = this.userService.getUsers();
}
