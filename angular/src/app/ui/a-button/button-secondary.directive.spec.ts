import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSecondaryDirective } from './button-secondary.directive';

@Component({
    standalone: true,
    template: `<button buttonSecondary>Secondary Button</button>`,
    imports: [ButtonSecondaryDirective]
})
class TestComponent {}

describe('ButtonSecondaryDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();
  });

  it('should add btn-secondary class to button element', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('btn-secondary');
  });
});
