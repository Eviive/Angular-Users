import { inject } from "@angular/core";
import { ResolveFn } from '@angular/router';
import { UserService } from "@app/core/services/user.service";
import { User } from "@app/users/user.model";

export const userListResolver: ResolveFn<User[]> = () => inject(UserService).getUsers();
