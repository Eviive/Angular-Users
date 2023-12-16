import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterLink, RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MatButtonModule,
        MatToolbarModule,
        RouterLink,
        RouterOutlet
    ]
})
export class HomeComponent {

    private readonly router = inject(Router);

    async handleLogout() {
        localStorage.removeItem('email');
        await this.router.navigate(['/login'], {
            queryParams: {
                redirect: this.router.url
            }
        });
    }

}
