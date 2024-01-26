import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { catchError, tap } from "rxjs";
import { UserService } from "../../user.service";
import { CreateUser, SetError, SetFirstName, SetLastName } from "./add-user.actions";

export interface AddUserStateModel {
  isLoading: boolean;
  error: string;
  firstName: string;
  lastName: string;
}

const defaults: AddUserStateModel = {
    isLoading: false,
    error: '',
    firstName: '',
    lastName: '',
}

@State({
  name: 'adduser',
  defaults
})
@Injectable()
export class AddUserState {
  constructor(private readonly _userService: UserService){}

  @Action(SetFirstName)
  setFirstName({patchState}:StateContext<AddUserStateModel>, {firstName}: SetFirstName) {
    patchState({ firstName });
  }

  @Action(SetLastName)
  setLastName({patchState}:StateContext<AddUserStateModel>, {lastName}: SetLastName) {
    patchState({ lastName });
  }

  @Action(CreateUser)
  createUser({dispatch, patchState, getState}: StateContext<AddUserStateModel>) {
    patchState({ isLoading: true });
    const { firstName, lastName } = getState();
    return this._userService.createUser({
      firstName,
      lastName
    }).pipe(
      tap(value => {
        // reset
        patchState({
          isLoading: false,
          firstName: '',
          lastName: '',
        });
        dispatch(new SetError('')).subscribe();
      }),
      catchError(error => {
        patchState({
          isLoading: false,
        })

        dispatch(new SetError(error.status.toString())).subscribe();
        throw error;
      })
    );
  }
  @Action(SetError)
  setError({patchState}:StateContext<AddUserStateModel>, {error}: SetError) {
    patchState({ error });
  }
}
