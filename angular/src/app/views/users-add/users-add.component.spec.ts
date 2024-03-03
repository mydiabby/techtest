import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddComponent } from './users-add.component';
import { UserService } from '../../core/ports/user.port';
import { User } from '../../core/models/user.model';
import { Observable, of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersAddComponent', () => {
    let component: UsersAddComponent;
    let fixture: ComponentFixture<UsersAddComponent>;
    let addOneSpy: Observable<User>;

    beforeEach(async () => {
        const user: User = { id: 54, firstname: 'fnTest', lastname: 'lnTest' };
        const userServiceSpy = jasmine.createSpyObj('UserService', ['addOne']);
        addOneSpy = userServiceSpy.addOne.and.returnValue(of(user));
        await TestBed.configureTestingModule({
            imports: [
                UsersAddComponent,
                NoopAnimationsModule,
            ],
            providers: [
                { provide: UserService, useValue: userServiceSpy },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UsersAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call service on onSubmit', () => {
        component.onSubmit();
        expect(addOneSpy).toHaveBeenCalledTimes(1);
    });
});
