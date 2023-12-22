import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginForm } from "@app/login/login.component";
import { UserService } from "@app/shared/services/user.service";
import { User } from "@app/users/user.model";
import { map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly userService = inject(UserService);
    private readonly snackbar = inject(MatSnackBar);

    private readonly _currentUser = signal<User | null>(null);
    readonly currentUser = this._currentUser.asReadonly();

    constructor() {
        const userJson = localStorage.getItem('user');

        if (!userJson) return;

        const user = JSON.parse(userJson) as User;
        this._currentUser.set(user);
    }

    login(loginForm: LoginForm): Observable<boolean> {
        return this.userService
            .getUsers()
            .pipe(
                map(users => users.find(user =>
                    user.email === loginForm.email &&
                    user.password === loginForm.password
                )),
                map(user => {
                    if (!user) {
                        localStorage.removeItem('user');
                        return false;
                    }

                    localStorage.setItem('user', JSON.stringify(user));
                    this._currentUser.set(user);
                    return true;
                }),
                tap(success => {
                    if (success) return;

                    this.snackbar.open(
                        'Login failed: user not found',
                        undefined,
                        {
                            duration: 5000
                        }
                    )
                })
            );
    }

    logout(): void {
        localStorage.removeItem('user');
        this._currentUser.set(null);
        this.snackbar.open(
            'Logout successful',
            undefined,
            {
                duration: 5000
            }
        );
    }

    isCurrentUser(user?: User | null): Signal<boolean> {
        return computed(() => {
            const currentUser = this.currentUser();

            if (!user || !currentUser) return false;

            return user.id === currentUser.id;
        });
    }

}
