import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from "@app/shared/guards/auth.guard";
import { map } from "rxjs";

export const loginGuard = ((route, state) => {
    const authGuardResult = authGuard(route, state);

    const router = inject(Router);

    return authGuardResult
        .pipe(
            map(result => {
                if (result !== true) return true;

                return router.createUrlTree(['/']);
            })
        );
}) satisfies CanActivateFn;
