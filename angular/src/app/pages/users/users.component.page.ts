import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersComponent } from '../../components/users/users.component';
import { UsersFacade } from '../../facades/users.facade';
import { User } from '../../http/users.model';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UsersComponent],
  templateUrl: './users.component.page.html',
  styleUrl: './users.component.page.css',
})
export class UsersComponentPage {
  allUsers$: Observable<User[]>;

  constructor(
    private usersFacade: UsersFacade,
    private activatedRoute: ActivatedRoute
  ) {
    this.allUsers$ = usersFacade.allUsers$;
    this.activatedRoute.data.subscribe();
  }
}
