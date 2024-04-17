import { UserGateway } from '../ports/user.gateway';
import { Observable, of } from 'rxjs';

export class InMemoryUserGateway extends UserGateway {
  private users: string[] = [];

  withUsers(users: string[]): InMemoryUserGateway {
    this.users = users;
    return this;
  }

  override retrieveAll(): Observable<string[]> {
    return of(this.users);
  }
}
