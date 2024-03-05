import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [
                provideRouter([{ path: '**', component: HeaderComponent }])
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain two element', () => {
        const ulElement = fixture.nativeElement.querySelector('#menu-list');
        const listItems = ulElement.querySelectorAll('li');
        expect(listItems.length).toBe(3);
    });
});
