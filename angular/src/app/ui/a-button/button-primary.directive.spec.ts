import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPrimaryDirective } from './button-primary.directive';

@Component({
    standalone: true,
    template: `<button buttonPrimary>Primary Button</button>`,
    imports: [ButtonPrimaryDirective]
})
class TestComponent {}

describe('ButtonPrimaryDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();
  });

  it('should add btn-primary class to button element', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('btn-primary');
  });
});
