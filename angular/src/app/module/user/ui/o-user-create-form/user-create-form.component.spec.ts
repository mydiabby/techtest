import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

import { UserCreateFormComponent } from './user-create-form.component';

class MockFormGroupDirective {
    form: FormGroup<any> = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl('')
    });
}

describe('UserCreateFormComponent', () => {
  let component: UserCreateFormComponent;
  let fixture: ComponentFixture<UserCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreateFormComponent],
      providers: [
        { provide: FormGroupDirective, useClass: MockFormGroupDirective }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(UserCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have form controls for first name and last name', () => {
    fixture = TestBed.createComponent(UserCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.firstName).toBeTruthy();
    expect(component.lastName).toBeTruthy();
  });
});
