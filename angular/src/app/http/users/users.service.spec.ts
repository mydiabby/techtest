import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';

describe('UsersService', () => {
  let service: UsersService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request to the API', () => {
    service.getAllUsers$().subscribe();

    const request = httpTestingController.expectOne(service.apiPath);
    expect(request.request.method).toBe('GET');
  });

  it('should send a POST request to the API', () => {
    const userCreateInfosMock = {
      firstName: 'Jon',
      lastName: 'Snow',
    };
    service.createUser(userCreateInfosMock).subscribe();

    const request = httpTestingController.expectOne(service.apiPath);
    expect(request.request.method).toBe('POST');
  });
});
