import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { UsersPageComponent } from './users-page.component';

describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPageComponent, HttpClientTestingModule],
      providers: [
        UserService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: { users: [] } }
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    userService = TestBed.inject(UserService);
    spyOn(userService, 'getUsers').and.returnValue(of([]));    
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display a message when no users are available', () => {
    userService = TestBed.inject(UserService);
    spyOn(userService, 'getUsers').and.returnValue(of([]));
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const message = compiled.querySelector('div');
    expect(message.textContent.trim()).toContain('Aucun utilisateur à afficher');
  });

  it('should display the list of users', () => {
    userService = TestBed.inject(UserService);
    spyOn(userService, 'getUsers').and.returnValue(of([
      { id: 1, firstName: 'John', lastName: 'Doe' }, 
      { id: 2, firstName: 'Jane', lastName: 'Smith' }
    ]));
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const userList = compiled.querySelector('app-users-list');
    expect(userList).toBeTruthy();
  });
});
