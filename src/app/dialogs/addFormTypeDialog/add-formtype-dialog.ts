import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormType } from '../../models/formType';

export interface DialogData {
    title: string
}

@Component({
    selector: 'add-formtype-dialog',
    templateUrl: './add-formtype-dialog.html',
    styleUrls: ['./add-formtype-dialog.scss']
})
export class AddFormTypeDialog {

    selectedFormType: FormType;
    formTypeList: FormType[] = [];

    constructor(
        public dialogRef: MatDialogRef<AddFormTypeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.formTypeList.push(FormType.INPUT_TEXT)
        this.formTypeList.push(FormType.INPUT_DATE)
        this.formTypeList.push(FormType.INPUT_PASSWORD)
    }

    close(): void {
        this.dialogRef.close();
    }

    submit() {
        this.dialogRef.close(this.selectedFormType)
    }
}