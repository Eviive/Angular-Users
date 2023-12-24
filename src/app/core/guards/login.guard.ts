import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "@app/core/services/auth.service";

export const loginGuard: CanActivateFn = route => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.currentUser;

    if (user() === null) {
        return true;
    }

    return router.createUrlTree([route.queryParamMap.get('redirect') ?? '/']);
};
