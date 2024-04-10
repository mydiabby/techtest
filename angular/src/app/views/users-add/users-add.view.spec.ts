import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddView } from './users-add.view';

describe('UsersAddView', () => {
  let component: UsersAddView;
  let fixture: ComponentFixture<UsersAddView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersAddView]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersAddView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
