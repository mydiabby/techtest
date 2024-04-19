import { UserGateway } from '../ports/user.gateway';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { PostUserDto } from '../models/dto/post-user.dto';

export class InMemoryUserGateway extends UserGateway {
  private users: string[] = [];

  withUsers(users: string[]): InMemoryUserGateway {
    this.users = users;
    return this;
  }

  override retrieveAll(): Observable<string[]> {
    return of(this.users);
  }

  override post(dto: PostUserDto): Observable<User> {
    throw new Error('Method not implemented.');
  }
}
