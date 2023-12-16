import { CanDeactivateFn } from "@angular/router";
import { UserFormComponent } from "@app/users/user-form/user-form.component";

export const formGuard: CanDeactivateFn<UserFormComponent> = component => {
    if (!component.userForm?.dirty) {
        return true;
    }

    return confirm('Are you sure you want to leave this page? All unsaved changes will be lost.');
};
