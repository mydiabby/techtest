import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FormDirective } from './form.directive';

@Component({
  standalone: true,
  template: `<form></form>`,
  imports: [FormDirective]
})
class TestComponent {}

describe('FormDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should add "was-validated" class on form submit', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(formElement.classList.contains('was-validated')).toBeTruthy();
  });
});
