import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from "@app/shared/services/user.service";
import { map, of } from "rxjs";

export const authGuard = ((_, state) => {
    const email = localStorage.getItem('email');

    const router = inject(Router);

    if (!email) return of(createLoginTree(router, state));

    return inject(UserService)
        .getUsers()
        .pipe(
            map(users => users.find(user => user.email === email)),
            map(user => {
                if (user) return true;

                localStorage.removeItem('email');
                return createLoginTree(router, state);
            })
        );
}) satisfies CanActivateFn;

const createLoginTree = (router: Router, state: any) =>
    router.createUrlTree(['/login'], {
        queryParams: {
            redirect: state.url
        }
    });
