import { Component, Signal, inject } from '@angular/core';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { User } from '../../core/models/user.model';
import { toSignal } from '@angular/core/rxjs-interop'
import { UserService } from '../../core/ports/user.port';
import { SortPipe } from '../../shared/pipes/sort.pipe';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [
        RouterLink,
        MatTableModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        TitleCasePipe,
        AsyncPipe,
        SortPipe
    ],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css'
})
export class UserListComponent {

    private userService = inject(UserService);

    columns: { code: string, text: string }[] = [
        { code: 'firstName', text: 'Prénom' },
        { code: 'lastName', text: 'Nom' }
    ];
    users: Signal<User[] | undefined> = toSignal(this.userService.getAll());

    protected mapColumnsCode(list: { code: string, text: string }[]): string[] {
        return list.map(el => el.code);
    }

}
