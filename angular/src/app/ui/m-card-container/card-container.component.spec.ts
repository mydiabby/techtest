import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContainerComponent } from './card-container.component';

describe('CardContainerComponent', () => {
  let component: CardContainerComponent;
  let fixture: ComponentFixture<CardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardContainerComponent]
    })
    .compileComponents();
  });
  
  it('should create', () => {
    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
    const title = 'Test Title';
    component.title = title;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h5');
    expect(titleElement.textContent).toContain(title);
  });
});
