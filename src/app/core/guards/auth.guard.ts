import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "@app/core/services/auth.service";

export const authGuard: CanActivateFn = (_, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.currentUser;

    if (user() !== null) {
        return true;
    }

    return router.createUrlTree(['/login'], {
        queryParams: {
            redirect: state.url
        }
    });
};
