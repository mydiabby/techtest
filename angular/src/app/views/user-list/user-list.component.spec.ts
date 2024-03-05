import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../../core/ports/user.port';
import { User } from '../../core/models/user.model';
import { Observable, of } from 'rxjs';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let getAllSpy: Observable<User[]>;

    beforeEach(async () => {
        const users: User[] = [];
        const userServiceSpy = jasmine.createSpyObj('UserService', ['getAll']);
        getAllSpy = userServiceSpy.getAll.and.returnValue(of(users));
        await TestBed.configureTestingModule({
            imports: [UserListComponent],
            providers: [
                { provide: UserService, useValue: userServiceSpy }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call service to get data once', () => {
        expect(getAllSpy).toHaveBeenCalledTimes(1);
    });

    xit('should display empty users list message');

    xit('should display the users list');

});
