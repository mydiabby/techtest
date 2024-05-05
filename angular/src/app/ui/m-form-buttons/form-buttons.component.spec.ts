import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { FormButtonsComponent } from './form-buttons.component';

describe('FormButtonsComponent', () => {
  let component: FormButtonsComponent;
  let fixture: ComponentFixture<FormButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormButtonsComponent, RouterModule.forRoot([])] // Import RouterModule.forRoot([]) to avoid router-related errors
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(FormButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display back button if backRoute is provided', () => {
    fixture = TestBed.createComponent(FormButtonsComponent);
    component = fixture.componentInstance;
    component.backRoute = '/back';
    fixture.detectChanges();
    const backButton = fixture.nativeElement.querySelector('#buttonBack');
    expect(backButton).toBeTruthy();
  });

  it('should not display back button if backRoute is not provided', () => {
    fixture = TestBed.createComponent(FormButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const backButton = fixture.nativeElement.querySelector('#buttonBack');
    expect(backButton).toBeFalsy();
  });

  it('should set back button name to default if not provided', () => {
    fixture = TestBed.createComponent(FormButtonsComponent);
    component = fixture.componentInstance;
    component.backRoute = '/back';
    fixture.detectChanges();
    const backButton = fixture.nativeElement.querySelector('#buttonBack');
    expect(backButton.textContent).toContain('Retour');
  });

  it('should set back button name to provided value', () => {
    fixture = TestBed.createComponent(FormButtonsComponent);
    component = fixture.componentInstance;
    component.backRoute = '/back';
    component.backName = 'Custom Back';
    fixture.detectChanges();
    const backButton = fixture.nativeElement.querySelector('#buttonBack');
    expect(backButton.textContent).toContain('Custom Back');
  });

  it('should set valid button name to default if not provided', () => {
    fixture = TestBed.createComponent(FormButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const validButton = fixture.nativeElement.querySelector('#buttonValid');
    expect(validButton.textContent).toContain('Valider');
  });

  it('should set valid button name to provided value', () => {
    fixture = TestBed.createComponent(FormButtonsComponent);
    component = fixture.componentInstance;
    component.backRoute = '/back';
    component.validName = 'Custom Back';
    fixture.detectChanges();
    const backButton = fixture.nativeElement.querySelector('#buttonValid');
    expect(backButton.textContent).toContain('Custom Back');
  });
});
