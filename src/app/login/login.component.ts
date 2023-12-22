import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import { AutoFocusDirective } from "@app/shared/directives/auto-focus.directive";
import { AuthService } from "@app/shared/services/auth.service";
import { Destroyed } from "@app/shared/utils/destroyed.component";
import { errorStateMatcher } from "@app/shared/utils/error-state-matcher";

export type LoginForm = {
    email: string;
    password: string;
};

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
        MatProgressSpinnerModule,
        AutoFocusDirective
    ]
})
export class LoginComponent extends Destroyed implements OnInit {

    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);
    private readonly formBuilder = inject(FormBuilder);

    @Input()
    private redirect?: string;

    isLoading = false;

    readonly matcher = errorStateMatcher;

    emailForm: FormGroup<{ [key in keyof LoginForm]: FormControl<LoginForm[key] | null> }> | null = null;

    ngOnInit() {
        this.emailForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    handleLogin() {
        if (
            this.isLoading ||
            !this.emailForm ||
            this.emailForm.invalid ||
            this.emailForm.value === null
        ) return;

        this.isLoading = true;

        this.authService
            .login(this.emailForm.value as LoginForm)
            .pipe(this.untilDestroyed())
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
