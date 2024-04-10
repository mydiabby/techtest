import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListView } from './users-list.view';

describe('UsersListView', () => {
  let component: UsersListView;
  let fixture: ComponentFixture<UsersListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListView]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
