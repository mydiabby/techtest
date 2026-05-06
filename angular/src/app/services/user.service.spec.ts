import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('createUser', () => {
    it('sends a POST to /users with firstName and lastName', () => {
      service.createUser('Simon', 'Dupont').subscribe();

      const req = httpMock.expectOne('http://localhost:3000/users');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        firstName: 'Simon',
        lastName: 'Dupont',
      });
      req.flush({ id: 1, firstName: 'Simon', lastName: 'Dupont' });
    });

    it('returns the created user from the response', (done) => {
      const expected = { id: 1, firstName: 'Simon', lastName: 'Dupont' };

      service.createUser('Simon', 'Dupont').subscribe((user) => {
        expect(user).toEqual(expected);
        done();
      });

      httpMock.expectOne('http://localhost:3000/users').flush(expected);
    });
  });
});
