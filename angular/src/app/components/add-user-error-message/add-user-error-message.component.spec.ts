import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserErrorMessageComponent } from './add-user-error-message.component';

describe('AddUserErrorMessageComponent', () => {
  let component: AddUserErrorMessageComponent;
  let fixture: ComponentFixture<AddUserErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserErrorMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
