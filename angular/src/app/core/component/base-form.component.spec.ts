import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';

import { BaseFormComponent } from './base-form.component';

class MockFormGroupDirective {
  form: FormGroup<any> = new FormGroup({
    exampleControl: new FormControl('')
  });
}

describe('BaseFormComponent', () => {
  let component: BaseFormComponent;
  let fixture: ComponentFixture<BaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFormComponent],
      providers: [
        { provide: FormGroupDirective, useClass: MockFormGroupDirective }
      ]
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(BaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize formGroup from formGroupDirective', () => {
    fixture = TestBed.createComponent(BaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.get('exampleControl')).toBeTruthy();
  });
});
