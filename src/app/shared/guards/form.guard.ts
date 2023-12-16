import { inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CanDeactivateFn } from "@angular/router";
import { ConfirmDialogComponent, ConfirmDialogData } from "@app/shared/ui/confirm-dialog/confirm-dialog.component";
import { UserFormComponent } from "@app/users/user-form/user-form.component";
import { map } from "rxjs";

export const formGuard: CanDeactivateFn<UserFormComponent> = component => {
    if (!component.userForm?.dirty || component.form.submitted) {
        return true;
    }

    return inject(MatDialog)
        .open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, {
            data: {
                title: 'Discard changes',
                message: 'Are you sure you want to discard your changes?',
                confirmText: 'Discard',
                confirmWarn: true,
                cancelText: 'Cancel'
            }
        })
        .afterClosed()
        .pipe(map(confirmed => confirmed || false));
};
