import { createAction, props } from '@ngrx/store';
import { User } from '../../user/user.model';

// Sign In Actions
export const signIn = createAction('[User] Sign In', props<{ email: string; password: string }>()
);

export const signUp = createAction('[User] Sign Up',
    props<{ email: string; password: string; name: string; surname: string, birthDate: Date, phone: string }>()
);

export const signUpSuccess = createAction('[User] Sign Up Success', props<{ user: User }>()
);

export const signUpFailure = createAction('[User] Sign Up Failure', props<{ error: string }>()
);

export const signInSuccess = createAction('[User] Sign In Success', props<{ user: User }>()
);

export const signInFailure = createAction('[User] Sign In Failure', props<{ error: string }>()
);

// Authenticate Actions
export const authenticate = createAction('[User] Authenticate', props<{ token: string }>());

export const authenticateSuccess = createAction('[User] Authenticate Success');

export const authenticateFailure = createAction('[User] Authenticate Failure', props<{ error: string }>());

// Sign Out Actions
export const signOut = createAction('[User] Sign Out');

// Get User Actions
export const getUser = createAction('[User] Get User', props<{ userId: number }>());

export const getUserSuccess = createAction('[User] Get User Success', props<{ user: User }>());

export const getUserFailure = createAction('[User] Get User Failure', props<{ error: string }>());

// Update User Actions
export const updateUser = createAction('[Profile] Update User', props<{ user: User }>());

export const updateUserSuccess = createAction('[Profile] Update User Success', props<{ user: User }>());

export const updateUserFailure = createAction('[Profile] Update User Failure', props<{ error: string }>());

// Delete User Actions
export const deleteUser = createAction('[Profile] Delete User', props<{ userId: string }>());

export const deleteUserSuccess = createAction('[Profile] Delete User Success');

export const deleteUserFailure = createAction('[Profile] Delete User Failure', props<{ error: string }>());

// Misc Actions
export const clearUserError = createAction('[User] Clear Error');

export const setUserId = createAction('[User] Set User Id', props<{ userId: number }>());

export const createCompanyUser = createAction('[User] Create Company User', props<{ company: User }>());

export const createCompanyUserSuccess = createAction('[User] Create Company User Success', props<{ company: User }>());

export const createCompanyUserFailure = createAction('[User] Create Company User Failure', props<{ error: string }>());
