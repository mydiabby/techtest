import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAddEditComponent } from './user-addedit.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('UserAddeditComponent', () => {
  let component: UserAddEditComponent;
  let fixture: ComponentFixture<UserAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddEditComponent, RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
