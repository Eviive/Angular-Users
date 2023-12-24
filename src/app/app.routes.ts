import { Routes } from '@angular/router';
import { authGuard } from "@app/core/guards/auth.guard";
import { formGuard } from "@app/core/guards/form.guard";
import { loginGuard } from "@app/core/guards/login.guard";
import { userListResolver } from "@app/users/user-list/user-list.resolver";
import { userResolver } from "@app/users/user/user.resolver";

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: () => import('@app/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('@app/home/home.component').then(m => m.HomeComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('@app/users/user-list/user-list.component').then(m => m.UserListComponent),
                resolve: {
                    users: userListResolver
                }
            },
            {
                path: 'new',
                canDeactivate: [formGuard],
                loadComponent: () => import('@app/users/user-form/user-form.component').then(m => m.UserFormComponent)
            },
            {
                path: ':id',
                resolve: {
                    user: userResolver
                },
                children: [
                    {
                        path: '',
                        loadComponent: () => import('@app/users/user/user.component').then(m => m.UserComponent)
                    },
                    {
                        path: 'edit',
                        canDeactivate: [formGuard],
                        loadComponent: () => import('@app/users/user-form/user-form.component').then(m => m.UserFormComponent)
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
