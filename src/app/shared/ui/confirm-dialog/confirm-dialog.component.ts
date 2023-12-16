import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";

export type ConfirmDialogData = {
    title?: string;
    message?: string;
    confirmText?: string;
    confirmWarn?: boolean;
    cancelText?: string;
};

@Component({
    standalone: true,
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose
    ]
})
export class ConfirmDialogComponent {

    private readonly dialog: MatDialogRef<ConfirmDialogComponent, boolean> = inject(MatDialogRef);
    readonly data: ConfirmDialogData = inject(MAT_DIALOG_DATA);

    handleCancel(): void {
        this.dialog.close();
    }

}
