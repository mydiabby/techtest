import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { UsersComponentPage } from './users.component.page';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UsersComponentPage', () => {
  let component: UsersComponentPage;
  let fixture: ComponentFixture<UsersComponentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponentPage, RouterTestingModule, HttpClientTestingModule]
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
