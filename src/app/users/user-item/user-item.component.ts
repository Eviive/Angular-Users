import { NgOptimizedImage, NgStyle } from "@angular/common";
import { Component, computed, inject, Input } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { AuthService } from "@app/shared/services/auth.service";
import { UserChipComponent } from "@app/users/user-chip/user-chip.component";
import { User } from "@app/users/user.model";

@Component({
    standalone: true,
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrl: './user-item.component.scss',
    imports: [
        MatButtonModule,
        RouterLink,
        MatListModule,
        NgOptimizedImage,
        MatCardModule,
        NgStyle,
        MatChipsModule,
        UserChipComponent
    ]
})
export class UserItemComponent {

    private readonly authService = inject(AuthService);

    @Input({ required: true })
    user!: User;

    isCurrentUser = computed(() => this.authService.isCurrentUser(this.user));

}
