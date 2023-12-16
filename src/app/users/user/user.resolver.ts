import { inject } from "@angular/core";
import { ResolveFn } from '@angular/router';
import { UserService } from "@app/shared/services/user.service";
import { User } from "@app/users/user.model";
import { catchError, of } from "rxjs";

export const userResolver: ResolveFn<User | null> = (route) =>
    inject(UserService)
        .getUser(route.params['id'])
        .pipe(
            catchError(() => of(null))
        );
