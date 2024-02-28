import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddUserComponent } from '../../components/add-user/add-user.component';
import { UsersFacade } from '../../facades/users.facade';
import { User } from '../../http/users.model';

@Component({
  selector: 'app-add-user-page',
  standalone: true,
  imports: [AddUserComponent],
  templateUrl: './add-user.component.page.html',
  styleUrl: './add-user.component.page.css',
})
export class AddUserComponentPage implements OnDestroy {
  subscriptions = new Subscription();

  constructor(private usersFacade: UsersFacade, private router: Router) {}

  createUser(userCreateInfos: User) {
    this.subscriptions.add(
      this.usersFacade.createUser(userCreateInfos).subscribe({
        next: (u) => this.router.navigate(['/users']),
        error: (e) => console.log(e),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
