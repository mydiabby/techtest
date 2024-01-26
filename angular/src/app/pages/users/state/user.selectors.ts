import { Selector } from "@ngxs/store";
import { UserState, UserStateModel } from "./user.state";

export class UserSelectors {
  @Selector([UserState])
  static isLoading(state: UserStateModel): boolean {
    return state.isLoading;
  }

  @Selector([UserState])
  static getFullNamesOfAllUsers(state: UserStateModel): string[]  {
    return state.getFullNamesOfAllUsers;
  }
}
