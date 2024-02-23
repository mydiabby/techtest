import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponentPage } from './users.component.page';

describe('UsersComponent', () => {
  let component: UsersComponentPage;
  let fixture: ComponentFixture<UsersComponentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponentPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
