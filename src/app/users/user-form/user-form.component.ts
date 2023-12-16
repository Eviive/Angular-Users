import { NgOptimizedImage, NgStyle } from "@angular/common";
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { UserService } from "@app/shared/services/user.service";
import { Destroyed } from "@app/shared/utils/destroyed.component";
import { errorStateMatcher } from "@app/shared/utils/error-state-matcher";
import { User } from "@app/users/user.model";

@Component({
    standalone: true,
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        RouterLink,
        NgOptimizedImage,
        NgStyle
    ]
})
export class UserFormComponent extends Destroyed implements OnInit {

    private readonly formBuilder = inject(FormBuilder);
    private readonly userService = inject(UserService);
    private readonly router = inject(Router);
    private readonly activatedRoute = inject(ActivatedRoute);

    @Input()
    user?: User | null;

    userForm: FormGroup<{ [key in keyof User]: FormControl<User[key] | null> }> | null = null;

    readonly matcher = errorStateMatcher;

    isLoading = false;

    async ngOnInit(): Promise<void> {
        if (this.user === null) {
            await this.router.navigate([ ".." ], {
                relativeTo: this.activatedRoute
            });
            return;
        }

        this.userForm = this.formBuilder.group({
            id: this.user?.id ?? null,
            name: [this.user?.name ?? "", Validators.required],
            occupation: [this.user?.occupation ?? "", Validators.required],
            email: [this.user?.email ?? "", [Validators.required, Validators.email]],
            bio: [this.user?.bio ?? "", Validators.required]
        });
    }

    handleSubmit(): void {
        if (!this.userForm || !this.userForm.dirty || this.userForm.invalid) return;

        this.isLoading = true;

        const submission = this.user
            ? this.userService.updateUser(this.userForm.value as User)
            : this.userService.addUser(this.userForm.value as User);

        submission
            .pipe(this.untilDestroyed())
            .subscribe({
                next: async user => {
                    if (this.user) {
                        Object.assign(this.user, user);
                    }
                    await this.router.navigate([user.id]);
                },
                error: () => this.isLoading = false,
                complete: () => this.isLoading = false
            });
    }

}
