import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@user/user.service';

import { UserCreatePageComponent } from './user-create-page.component';

describe('UserCreatePageComponent', () => {
  let component: UserCreatePageComponent;
  let fixture: ComponentFixture<UserCreatePageComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userService = jasmine.createSpyObj('UserService', ['createUser']);
    const toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [UserCreatePageComponent],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userService },
        { provide: ToastrService, useValue: toastrService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: { snapshot: { data: { users: [] } }}}
      ]
    })
    .compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    fixture = TestBed.createComponent(UserCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not call userService.createUser if form is invalid', () => {
    fixture = TestBed.createComponent(UserCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const invalidFormData = { firstName: '', lastName: '' };
    component.userCreateForm.setValue(invalidFormData);

    component.onSubmit();

    expect(userServiceSpy.createUser).not.toHaveBeenCalled();
  });

  it('should call userService.createUser and show success message on successful user creation', fakeAsync(() => {
    fixture = TestBed.createComponent(UserCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    const validFormData = { firstName: 'John', lastName: 'Doe' };
    component.userCreateForm.setValue(validFormData);

    userServiceSpy.createUser.and.returnValue(of(null));

    component.onSubmit();
    tick();

    expect(userServiceSpy.createUser).toHaveBeenCalledWith(validFormData);
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('L\'utilisateur a été créé avec succès.');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/users');
  }));
});
