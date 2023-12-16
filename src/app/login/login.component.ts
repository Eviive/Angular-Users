import { Component, inject, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
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
    private readonly snackbar = inject(MatSnackBar);

    @Input()
    private redirect?: string;

    readonly matcher = errorStateMatcher;

    emailForm = new FormControl('', [Validators.required, Validators.email]);

    async handleLogin() {
        if (this.emailForm.invalid || this.emailForm.value === null) return;

        localStorage.setItem('email', this.emailForm.value);

        const success = await this.router.navigate([this.redirect ?? '/']);

        if (success) return;

        this.snackbar.open('Login failed: unknown email address', undefined, {
            duration: 5000
        });
    }

}
