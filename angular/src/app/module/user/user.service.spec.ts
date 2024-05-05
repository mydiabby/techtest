import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@env/environment';

import { UserCreateto, User } from './user.model';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    const users: User[] = [
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { id: 2, firstName: 'Jane', lastName: 'Smith' }
    ];

    service.getUsers().subscribe(data => {
      expect(data).toEqual(users);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toEqual('GET');
    req.flush(users);
  });

  it('should create user', () => {
    const newUser: UserCreateto = { firstName: 'Alice', lastName: 'Johnson' };
    const createdUser: User = { id: 3, ...newUser };

    service.createUser(newUser).subscribe(data => {
      expect(data).toEqual(createdUser);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toEqual('POST');
    req.flush(createdUser);
  });
});
