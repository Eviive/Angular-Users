import { NgOptimizedImage, NgStyle } from "@angular/common";
import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "@app/core/services/auth.service";

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MatButtonModule,
        MatToolbarModule,
        RouterLink,
        RouterOutlet,
        NgOptimizedImage,
        NgStyle,
        MatTooltipModule
    ]
})
export class HomeComponent {

    private readonly router = inject(Router);
    readonly authService = inject(AuthService);

    async handleLogout() {
        this.authService.logout();
        await this.router.navigate(['/login'], {
            queryParams: {
                redirect: this.router.url
            }
        });
    }

}
