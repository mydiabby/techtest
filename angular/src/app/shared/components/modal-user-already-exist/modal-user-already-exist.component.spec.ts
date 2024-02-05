import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserAlreadyExistComponent } from './modal-user-already-exist.component';

describe('ModalUserAlreadyExistComponent', () => {
  let component: ModalUserAlreadyExistComponent;
  let fixture: ComponentFixture<ModalUserAlreadyExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUserAlreadyExistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUserAlreadyExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
