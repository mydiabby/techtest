import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddUserComponentPage } from './add-user.component.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddUserComponentPage', () => {
  let component: AddUserComponentPage;
  let fixture: ComponentFixture<AddUserComponentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserComponentPage, HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule]
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
