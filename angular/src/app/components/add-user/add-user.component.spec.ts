import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddUserComponent } from './add-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { WORDING } from '../../../assets/wording';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserComponent, RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct add user title', () => {

    const titleElement = fixture.debugElement.query(By.css('.add-user-title'));
    const titleText = titleElement.nativeElement.textContent;
  
    expect(titleText).toBe(WORDING.addUserTitle);
  });

  it('should render the app-add-user-form component', () => {
    const formElement = fixture.debugElement.query(By.css('app-add-user-form'));
    expect(formElement).not.toBeNull();
  });

  it('should display the error message when showErrorMessage is true', () => {
    const fixture = TestBed.createComponent(AddUserComponent);
    fixture.componentInstance.showErrorMessage = true;
    fixture.detectChanges();
  
    const errorMessageElement = fixture.debugElement.query(By.css('app-add-user-error-message'));
  
    expect(errorMessageElement).not.toBeNull();
  });

  it('should not display the error message when showErrorMessage is false', () => {
    const errorMessageElement = fixture.debugElement.query(By.css('app-add-user-error-message'));
    expect(errorMessageElement).toBeNull();
  });
});
