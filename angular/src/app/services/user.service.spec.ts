import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '@environments/environment';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of users sorted by name ascending', () => {
    const mockUsers = ['Maya Hi', 'Maya Hou', 'Maya Ha', 'Maya Haha'];

    service.getAllUsers().subscribe(users => {
      expect(users).toBeTruthy();
      expect(users.length).toBe(4);
      expect(users).toEqual(['Maya Ha', 'Maya Haha', 'Maya Hi', 'Maya Hou']);
    });

    const req = httpTestingController.expectOne(`${environment.apiURL}/users`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
