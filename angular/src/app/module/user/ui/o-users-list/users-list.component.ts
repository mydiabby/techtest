import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@user/user.model';

@Component({
    standalone: true,
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
    @Input() users: User[] = [];
}