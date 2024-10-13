import {Component, Inject, OnInit} from '@angular/core';
import {RetrieveUsers} from "../business/use-cases/retrieve-users";
import {RETRIEVE_USERS_TOKEN, retrieveUsersProvider} from "../config/retrieve-users.provider";
import {userGatewayProvider} from "../config/user-gateway.provider";
import {Router} from "@angular/router";
import {userStorageProvider} from "../../../_common/storage/user-storage.provider";
import {UserVM} from "../business/models/user-vm";

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [retrieveUsersProvider, userGatewayProvider, userStorageProvider],
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public users: UserVM[] = [];

  constructor(
    private router: Router,
    @Inject(RETRIEVE_USERS_TOKEN) private readonly _retrieveUsers: RetrieveUsers
  ) {}

  async ngOnInit() {
    this.users = await this._retrieveUsers.retrieve();
  }

  async onRequestAddUser() : Promise<void> {
    await this.router.navigateByUrl('/users/add')
  }
}
