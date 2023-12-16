import { Component, inject, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import { AuthService } from "@app/shared/services/auth.service";
import { errorStateMatcher } from "@app/shared/utils/error-state-matcher";

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ]
})
export class LoginComponent {

    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);

    @Input()
    private redirect?: string;

    isLoading = false;

    readonly matcher = errorStateMatcher;

    emailForm = new FormControl('', [Validators.required, Validators.email]);

    handleLogin() {
        if (this.emailForm.invalid || this.emailForm.value === null) return;

        this.isLoading = true;
        this.authService
            .login(this.emailForm.value)
            .subscribe({
                next: () => {
                    this.router
                        .navigate([this.redirect ?? '/'])
                        .catch(console.error);
                },
                error: () => this.isLoading = false,
                complete: () => this.isLoading = false
            });
    }

}
