import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../states/user.state";

export const selectUserInfo = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
    selectUserInfo,
    (state: UserState) => state.user
);

export const selectUserError = createSelector(
    selectUserInfo,
    (state: UserState) => state.error
);

export const selectUserType = createSelector(
    selectUserInfo,
    (state: UserState) => state.user?.type
);
