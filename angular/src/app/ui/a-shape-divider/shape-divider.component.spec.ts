import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';

import { ShapeDividerComponent } from './shape-divider.component';

describe('ShapeDividerComponent', () => {
  let component: ShapeDividerComponent;
  let fixture: ComponentFixture<ShapeDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapeDividerComponent]
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ShapeDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set opacity properties', () => {
    fixture = TestBed.createComponent(ShapeDividerComponent);
    component = fixture.componentInstance;
    component.opacity1 = 25;
    component.opacity2 = 50;
    component.opacity3 = 75;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const svgElements = compiled.querySelectorAll('svg path');
    expect(svgElements[0].classList).toContain('opacity-25');
    expect(svgElements[1].classList).toContain('opacity-50');
    expect(svgElements[2].classList).toContain('opacity-75');
});
});
