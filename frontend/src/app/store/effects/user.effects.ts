import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.model';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.signUp),
            switchMap(({ email, password, name, surname, birthDate, phone }) =>
                this.userService.signUp(email, password, name, surname, birthDate, phone).pipe(
                    map((response) => {
                        return UserActions.authenticate({ token: response.body['access_token'] });
                    }),
                    catchError((error) => {
                        if (error.status == 404)
                            return of(UserActions.signUpFailure({ error: 'User already exists. Please sign in!' }));
                        else
                            return of(UserActions.signUpFailure({ error: 'Failed to sign up' }));
                    })
                )
            )
        )
    );

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.signIn),
            switchMap(({ email, password }) =>
                this.userService.signIn(email, password).pipe(
                    map((response) => {
                        localStorage.setItem('token', response.body['access_token']);
                        return UserActions.authenticate({ token: response.body['access_token'] });
                    }),
                    catchError((error) => {
                        if (error.status == 404)
                            return of(UserActions.signInFailure({ error: 'User does not exist. Please sign up!' }));
                        else
                            return of(UserActions.signInFailure({ error: 'Incorrect password' }));
                    })
                )
            )
        )
    );

    authenticate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.authenticate),
            switchMap(({ token }) =>
                this.userService.auth(token).pipe(
                    map((response) => {
                        return UserActions.getUser({ userId: response.body['userId'] });
                    }),
                    catchError((error) => {
                        return of(UserActions.authenticateFailure({ error: 'Authentication failed' }));
                    })
                )
            )
        )
    );

    setUserId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.setUserId),
            switchMap(({ userId }) =>
                this.userService.getUser(userId).pipe(
                    map((response) => {
                        let body = response.body;
                        let user: User = {
                            id: body.id,
                            email: body.email,
                            name: body.name,
                            surname: body.surname,
                            birthDate: body.birthDate,
                            phone: body.phone,
                            type: body.type
                        };
                        return UserActions.getUserSuccess({ user });
                    },
                        catchError((error) => {
                            return of(UserActions.getUserFailure({ error: 'Failed to get user' }));
                        })
                    )
                )
            )
        ));

    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getUser),
            switchMap(({ userId }) =>
                this.userService.getUser(userId).pipe(
                    map((response) => {
                        let body = response.body;
                        let user: User = {
                            id: body.id,
                            email: body.email,
                            name: body.name,
                            surname: body.surname,
                            birthDate: body.birthDate,
                            phone: body.phone,
                            type: body.type
                        };
                        return UserActions.getUserSuccess({ user });
                    },
                        catchError((error) => {
                            return of(UserActions.getUserFailure({ error: 'Failed to get user' }));
                        })
                    )
                )
            )
        ));

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteUser),
            switchMap(({ userId }) =>
                this.userService.deleteUser(userId).pipe(
                    map(() => {
                        return UserActions.deleteUserSuccess();
                    }),
                    catchError((error) => {
                        return of(UserActions.deleteUserFailure({ error: 'Failed to delete user' }));
                    })
                )
            )
        ));

    createCompanyUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.createCompanyUser),
            switchMap(({ company }) =>
                this.userService.createCompanyUser(company).pipe(
                    map((response) => {
                        let body = response.body;
                        let company: User = {
                            id: body.id,
                            email: body.email,
                            name: body.name,
                            surname: body.surname,
                            birthDate: body.birthDate,
                            phone: body.phone,
                            type: body.type
                        };
                        return UserActions.createCompanyUserSuccess({ company });
                    }),
                    catchError((error) => {
                        return of(UserActions.createCompanyUserFailure({ error: 'Failed to create company user' }));
                    })
                )
            )
        ));
}
