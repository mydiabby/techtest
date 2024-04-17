import { Component, inject } from '@angular/core';
import { UserGateway } from '../../core/ports/user.gateway';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  userGateway = inject(UserGateway);
  users = toSignal(this.userGateway.retrieveAll());
}
