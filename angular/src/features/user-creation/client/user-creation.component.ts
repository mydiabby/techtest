import {Component, Inject} from '@angular/core';
import {ADD_USER_TOKEN, addUserProvider} from "../config/add-user.provider";
import {userRepositoryProvider} from "../config/user-repository.provider";
import {FormsModule, } from "@angular/forms";
import {AddUser} from "../business/use-cases/add-user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [FormsModule],
  providers: [addUserProvider, userRepositoryProvider],
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.scss'
})
export class UserCreationComponent {
  firstName: string = ''
  lastName: string = ''
  error: string = ''

  constructor(private router: Router, @Inject(ADD_USER_TOKEN) private readonly _addUser: AddUser) {}

  async onCreateNewUser(event: Event) {
    event.preventDefault();
    try {
      this.error = ''
      await this._addUser.createAUser({firstName: this.firstName, lastName: this.lastName})
    } catch (e) {
      this.error = 'Une erreur est survenue lors de la création de l\'utilisateur'
      throw new Error('Une erreur est survenue lors de la création de l\'utilisateur')
    }
    await this.router.navigateByUrl('/users')
  }
}
