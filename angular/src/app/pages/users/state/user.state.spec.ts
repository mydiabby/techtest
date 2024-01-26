import { TestBed } from "@angular/core/testing";
import Substitute, { SubstituteOf } from "@fluffy-spoon/substitute";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { UserService } from "../user.service";
import { GetFullNamesOfAllUsers } from "./user.actions";
import { UserSelectors } from "./user.selectors";
import { UserState } from "./user.state";

describe('UserState', () => {
  let store: Store;

  let userService: SubstituteOf<UserService>;

  beforeEach(() => {
    userService = Substitute.for<UserService>();

    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([
          UserState
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
  })

  it('should be list users', () => {
    // Arrange
    userService.getFullNamesOfAllUsers().returns(
      of(["John DOE", "Vincent LECLERC"])
    )

    store.dispatch(new GetFullNamesOfAllUsers())

    // Act
    const response = store.selectSnapshot(UserSelectors.getFullNamesOfAllUsers);

    // Assert
    expect(response.length).toBe(2);
  })
})
