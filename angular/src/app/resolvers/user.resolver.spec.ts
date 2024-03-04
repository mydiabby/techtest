import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { userResolver } from './user.resolver';

describe('userResolver', () => {
  const executeResolver: ResolveFn<Observable<void>> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
