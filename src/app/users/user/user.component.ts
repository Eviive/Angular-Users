import { NgOptimizedImage, NgStyle } from "@angular/common";
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router, RouterLink } from "@angular/router";
import { UserService } from "@app/shared/services/user.service";
import { Destroyed } from "@app/shared/utils/destroyed.component";
import { User } from "@app/users/user.model";

@Component({
    standalone: true,
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    imports: [
        MatCardModule,
        MatButtonModule,
        RouterLink,
        MatProgressSpinnerModule,
        MatListModule,
        NgOptimizedImage,
        NgStyle
    ]
})
export class UserComponent extends Destroyed {

    private readonly userService = inject(UserService);
    private readonly router = inject(Router);

    @Input({ required: true })
    user!: User | null;

    isLoading = false;

    handleDelete(user: User): void {
        this.isLoading = true;

        this.userService
            .deleteUser(user)
            .pipe(this.untilDestroyed())
            .subscribe({
                next: () => this.router.navigate([ "/" ]),
                error: () => this.isLoading = false,
                complete: () => this.isLoading = false
            });
    }

}
