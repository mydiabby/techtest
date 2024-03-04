import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersComponent } from './users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { WORDING } from '../../../assets/wording';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsersComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct users list title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('.users-list-title')
    );
    const titleText = titleElement.nativeElement.textContent;
    expect(titleText).toBe(WORDING.usersListTitle);
  });

  it('should display the "Ajouter un utilisateur" button', () => {
    const buttonElement = fixture.debugElement.query(
      By.css('button[mat-raised-button]')
    );

    expect(buttonElement).not.toBeNull();
    expect(buttonElement.nativeElement.textContent).toBe(
      ' ' + WORDING.addUserButtonLabel + ' '
    );
  });
});
