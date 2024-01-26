import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { UserService } from "../user.service";
import { GetFullNamesOfAllUsers } from "./user.actions";

export interface UserStateModel {
  isLoading: boolean;
  getFullNamesOfAllUsers: string[];
}

const defaults: UserStateModel = {
    isLoading: false,
    getFullNamesOfAllUsers: [],
}

@State({
  name: 'user',
  defaults
})
@Injectable()
export class UserState {
  constructor(private userService: UserService){}

  @Action(GetFullNamesOfAllUsers)
  getFullNamesOfAllUsers({patchState}:StateContext<UserStateModel>) {
    patchState({ isLoading: true });

    return this.userService.getFullNamesOfAllUsers().pipe(
      tap(value => {
        patchState({
          isLoading: false,
          getFullNamesOfAllUsers: [...value],
        });
      }
    ));
  }
}
