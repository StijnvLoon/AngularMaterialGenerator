import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'select-formtemplate-dialog',
    templateUrl: './select-formtemplate-dialog.html',
    styleUrls: ['./select-formtemplate-dialog.scss']
})
export class SelectFormTemplateDialog {

    constructor(
        public dialogRef: MatDialogRef<SelectFormTemplateDialog>) {
    }

    close(): void {
        this.dialogRef.close();
    }
}