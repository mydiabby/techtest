import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserListComponent } from './user-list.component';
import { UserGateway } from '../../core/ports/user.gateway';
import { InMemoryUserGateway } from '../../core/adapters/in-memory-user.gateway';

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let userGateway: InMemoryUserGateway;

  beforeEach(async () => {
    userGateway = new InMemoryUserGateway();
    await TestBed.configureTestingModule({
      imports: [UserListComponent, RouterTestingModule],
      providers: [
        { provide: UserGateway, useFactory: () => userGateway }
      ]
    })
      .compileComponents();
  });

  it('should not have any users', () => {
    setup([]);
    expect(fixture.nativeElement.textContent).toContain(`It's empty 😥`);
  });

  it('should have users', () => {
    setup([
      'Tony Stark',
      'Steve Rogers',
    ]);

    expect(fixture.nativeElement.querySelectorAll(`div[class="user"]`).length).toBe(2);
    expect(fixture.nativeElement.textContent).not.toContain(`It's empty 😥`);
  });

  function setup(users: string[]) {
    userGateway.withUsers(users);

    fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();
  }
});
