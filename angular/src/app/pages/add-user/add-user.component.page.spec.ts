import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponentPage } from './add-user.component.page';

describe('AddUserComponent', () => {
  let component: AddUserComponentPage;
  let fixture: ComponentFixture<AddUserComponentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserComponentPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
