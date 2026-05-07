import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { provideRouter, Router } from '@angular/router';

import { AddUserComponent } from './add-user.component';
import { UserService } from '../../services/user.service';

describe('AddUserComponent', () => {
  let fixture: ComponentFixture<AddUserComponent>;
  let component: AddUserComponent;
  let userService: jasmine.SpyObj<UserService>;
  let router: Router;

  beforeEach(async () => {
    userService = jasmine.createSpyObj<UserService>('UserService', [
      'createUser',
    ]);

    await TestBed.configureTestingModule({
      imports: [AddUserComponent, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: userService },
        provideRouter([]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts with an invalid empty form', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('is valid when both fields have at least 2 characters', () => {
    component.form.setValue({ firstName: 'Si', lastName: 'Du' });
    expect(component.form.valid).toBeTrue();
  });

  it("doesn't call createUser when the form is invalid", () => {
    component.form.setValue({ firstName: 'S', lastName: '' });
    component.submit();
    expect(userService.createUser).not.toHaveBeenCalled();
  });

  it('call createUser with form values on valid submit', () => {
    userService.createUser.and.returnValue(
      of({ id: 1, firstName: 'Simon', lastName: 'Dupont' }),
    );

    component.form.setValue({ firstName: 'Simon', lastName: 'Dupont' });
    component.submit();

    expect(userService.createUser).toHaveBeenCalledWith('Simon', 'Dupont');
  });

  it('redirects to /users after a successful creation', () => {
    userService.createUser.and.returnValue(
      of({ id: 1, firstName: 'Simon', lastName: 'Dupont' }),
    );

    component.form.setValue({ firstName: 'Simon', lastName: 'Dupont' });
    component.submit();

    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('shows a specific error when the user already exists (409)', () => {
    userService.createUser.and.returnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 409,
            error: { code: 'USER_ALREADY_EXISTS' },
          }),
      ),
    );

    component.form.setValue({ firstName: 'Simon', lastName: 'Dupont' });
    component.submit();

    expect(component.errorMessage).toBe('Cet utilisateur existe déjà.');
  });

  it('shows a generic error message on unknown server error', () => {
    userService.createUser.and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 500 })),
    );

    component.form.setValue({ firstName: 'Simon', lastName: 'Dupont' });
    component.submit();

    expect(component.errorMessage).toBe(
      "Une erreur est survenue lors de l'ajout.",
    );
  });
});
