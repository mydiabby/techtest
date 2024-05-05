import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Signal, signal } from '@angular/core';

import { ButtonDirective } from './button.directive';

@Component({
    standalone: true,
    template: `<button buttonDefault [busy]="busy">Test Button</button>`,
    imports: [ButtonDirective]
})
class TestComponent {
    busy = signal(false); // Mock Signal
}

describe('ButtonDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should update button content with spinner when busy is true', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.busy.set(true);
    buttonElement = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();

    const initialContent = 'Test Button';
    const spinner = '<span class="material-symbols-outlined material-symbols-spin me-2">refresh</span>';

    expect(buttonElement.innerHTML).toContain(initialContent);
    expect(buttonElement.innerHTML).toContain(spinner);
  });

  it('should update button content without spinner when busy is false', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.busy.set(false);
    buttonElement = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
    
    const initialContent = 'Test Button';
    const spinner = '<span class="material-symbols-outlined material-symbols-spin me-2">refresh</span>';

    expect(buttonElement.innerHTML).toContain(initialContent);
    expect(buttonElement.innerHTML).not.toContain(spinner);
  });
});
