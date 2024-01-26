import { Selector } from "@ngxs/store";
import { AddUserState, AddUserStateModel } from "./add-user.state";

export class AddUserSelectors {
  @Selector([AddUserState])
  static isLoading(state: AddUserStateModel): boolean {
    return state.isLoading;
  }

  static hasError(state: AddUserStateModel): string {
    return state.error;
  }

  @Selector([AddUserState])
  static firstName(state: AddUserStateModel): string {
    return state.firstName;
  }

  @Selector([AddUserState])
  static lastName(state: AddUserStateModel): string {
    return state.lastName;
  }
}
