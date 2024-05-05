import { ToastrModule, ToastrService } from 'ngx-toastr';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';

import { errorInterceptor } from './error.interceptor';

class MockToastrService {
  public error(message?: string, title?: string): void {};
}
describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: ToastrService, useClass: MockToastrService }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should handle HTTP errors and show toast message', () => {
    spyOn(toastrService, 'error');
    
    httpClient.get('/api/data').subscribe(
      () => fail('should have failed with the error message'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
        expect(toastrService.error).toHaveBeenCalledWith('Echec de la requête : Error message from server');
      }
    );

    const req = httpTestingController.expectOne('/api/data');
    req.flush({ message: 'Error message from server' }, { status: 500, statusText: 'Internal Server Error' });
  });
});
