import { TestBed, waitForAsync } from "@angular/core/testing";
import Substitute, { Arg, SubstituteOf } from "@fluffy-spoon/substitute";
import { Actions, NgxsModule, Store } from "@ngxs/store";
import { Observable, firstValueFrom, of } from "rxjs";
import { ICreateUserDto } from "../../createUserDto";
import { UserService } from "../../user.service";
import { CreateUser } from "./add-user.actions";
import { AddUserState } from "./add-user.state";

describe('AddUserState', () => {
  let store: Store;
  let actions$: Observable<any>;

  let userService: SubstituteOf<UserService>;

  beforeEach(waitForAsync(() => {
    userService = Substitute.for<UserService>();

    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([
          AddUserState
        ])
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions);
  }));

  it('should be create a user', async () => {
    // Arrange
    const isLoading = true;
    const firstName = "John";
    const lastName = "DOE";

    const createdUserDto: ICreateUserDto = {
      firstName: firstName,
      lastName: lastName,
    };

    userService.createUser(Arg.all()).returns(
      of({
        firstName: firstName,
        lastName: lastName,
      })
    )

    store.reset({
      ...store.snapshot(),
      adduser: {
        ...store.snapshot().adduser,
        isLoading,
        firstName,
        lastName
      }
    })

    // Act
    await firstValueFrom(store.dispatch(new CreateUser(createdUserDto)));

    // Assert
    const storeSnapshot = store.snapshot();
    expect(storeSnapshot.adduser.isLoading).toBe(false);
    expect(storeSnapshot.adduser.firstName).toBe('');
    expect(storeSnapshot.adduser.lastName).toBe('');
    userService.received(1).createUser(Arg.all());
  });
});
