import { NgOptimizedImage, NgStyle } from "@angular/common";
import { Component, inject, Input, OnChanges, Signal, SimpleChanges } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@app/core/services/auth.service";
import { UserService } from "@app/core/services/user.service";
import { ConfirmDialogComponent, ConfirmDialogData } from "@app/shared/ui/confirm-dialog/confirm-dialog.component";
import { Destroyed } from "@app/shared/utils/destroyed.component";
import { UserChipComponent } from "@app/users/user-chip/user-chip.component";
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
        NgStyle,
        MatTooltipModule,
        MatChipsModule,
        UserChipComponent
    ]
})
export class UserComponent extends Destroyed implements OnChanges {

    private readonly userService = inject(UserService);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly dialog = inject(MatDialog);

    @Input({ required: true })
    user!: User | null;

    isCurrentUser!: Signal<boolean>;

    isLoading = false;

    ngOnChanges(changes: SimpleChanges) {
        if (!changes['user']) return;

        this.isCurrentUser = this.authService.isCurrentUser(this.user);
    }

    handleDelete(user: User): void {
        if (this.isCurrentUser()) return;

        this.dialog
            .open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, {
                data: {
                    title: 'Delete user',
                    message: `Are you sure you want to delete ${user.name}?`,
                    confirmText: 'Delete',
                    confirmWarn: true,
                    cancelText: 'Cancel'
                }
            })
            .afterClosed()
            .pipe(this.untilDestroyed())
            .subscribe(confirmed => confirmed && this.deleteUser(user));
    }

    private deleteUser(user: User): void {
        if (this.isLoading) return;

        this.isLoading = true;

        this.userService
            .deleteUser(user)
            .pipe(this.untilDestroyed())
            .subscribe({
                next: () => {
                    this.router
                        .navigate(['/'])
                        .catch(console.error);
                },
                error: () => this.isLoading = false,
                complete: () => this.isLoading = false
            });
    }

}
