import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { UserState } from '../states/user.state';

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    error: "",
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.signUpSuccess, (state, { user }) => ({
        ...state,
        user: user,
        isAuthenticated: true,
        error: "",
    })),
    on(UserActions.signUpFailure, (state, { error }) => ({
        ...state,
        user: null,
        isAuthenticated: false,
        error: error,
    })),
    on(UserActions.signInSuccess, (state, { user }) => ({
        ...state,
        user: user,
        isAuthenticated: true,
        error: "",
    })),
    on(UserActions.signInFailure, (state, { error }) => ({
        ...state,
        user: null,
        isAuthenticated: false,
        error: error,
    })),
    on(UserActions.authenticateSuccess, (state) => ({
        ...state,
        user: null,
        isAuthenticated: true,
        error: "",
    })),
    on(UserActions.authenticateFailure, (state, { error }) => ({
        ...state,
        user: null,
        isAuthenticated: false,
        error: error,
    })),
    on(UserActions.signOut, (state) => ({
        ...state,
        user: null,
        isAuthenticated: false,
        error: "",
    })),
    on(UserActions.getUserSuccess, (state, { user }) => ({
        ...state,
        user: user,
        error: "",
    })),
    on(UserActions.getUserFailure, (state, { error }) => ({
        ...state,
        user: null,
        error: error,
    })),
    on(UserActions.clearUserError, (state) => ({
        ...state,
        error: "",
    })),
    on(UserActions.deleteUserSuccess, (state) => ({
        ...state,
        user: null,
        isAuthenticated: false,
        error: "",
    })),
    on(UserActions.deleteUserFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
    on(UserActions.createCompanyUserSuccess, (state, { company }) => ({
        ...state,
        error: "",
    })),
    on(UserActions.createCompanyUserFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
);
