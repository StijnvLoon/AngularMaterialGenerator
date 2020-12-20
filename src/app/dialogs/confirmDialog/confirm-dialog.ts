import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string
}

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.html',
    styleUrls: ['./confirm-dialog.scss']
})
export class ConfirmDialog {

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    close(): void {
        this.dialogRef.close();
    }

    submit() {
        this.dialogRef.close(this.data)
    }
}