import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { UsersComponent } from './users.component';
import { By } from '@angular/platform-browser';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent, HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the table header', () => {
    const tableHeader = fixture.nativeElement.querySelector('table thead');

    expect(tableHeader.textContent).toContain('Id.');
    expect(tableHeader.textContent).toContain('Prénom');
    expect(tableHeader.textContent).toContain('Nom');
  });

  // it('should render the table rows', () => {
  //   const tableRows = fixture.nativeElement.querySelectorAll('table tbody tr');

  //   expect(tableRows.length).toBe(0); // Les données sont chargées dynamiquement

  //   component.users = [
  //     { id: 1, firstName: 'John', lastName: 'Doe' },
  //     { id: 2, firstName: 'Jane', lastName: 'Smith' }
  //   ];
  //   component.dataSource.set(component.users);

  //   fixture.whenStable().then(() => {

  //     fixture.detectChanges(); // Déclenche la vérification des changements
  //     const tableRows = fixture.nativeElement.querySelectorAll('table tbody tr');

  //     expect(tableRows.length).toBe(2);
  //     expect(tableRows[0].textContent).toContain('John Doe');
  //     expect(tableRows[1].textContent).toContain('Jane Smith');
  //   });
  // });
});
