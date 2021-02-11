import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
    selector: 'select-formtemplate-dialog',
    templateUrl: './select-formtemplate-dialog.html',
    styleUrls: ['./select-formtemplate-dialog.scss']
})
export class SelectFormTemplateDialog {

    constructor(
        public dialogRef: MatDialogRef<SelectFormTemplateDialog>,
        public themeService: ThemeService) {
    }

    close(): void {
        this.dialogRef.close();
    }
}