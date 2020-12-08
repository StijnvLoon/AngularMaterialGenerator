import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormObjectType } from '../../models/forms/IFormObject'

export interface DialogData {
    title: string
}

@Component({
    selector: 'add-formobject-dialog',
    templateUrl: './add-formobject-dialog.html',
    //styleUrls: ['../dialog.css']
})
export class AddFormObjectDialog {

    selectedFormObject: IFormObjectType;

    constructor(
        public dialogRef: MatDialogRef<AddFormObjectDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    close(): void {
        this.dialogRef.close();
    }

    submit() {
        this.dialogRef.close(this.selectedFormObject)
    }
}