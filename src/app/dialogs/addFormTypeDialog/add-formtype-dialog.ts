import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormTypeCat } from 'src/app/models/enums/formTypeCat';
import { FormTypeService } from 'src/app/services/form-type.service';
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
    formTypeCategorieList: string[] = []

    constructor(
        public dialogRef: MatDialogRef<AddFormTypeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public formTypeService: FormTypeService) {
        this.formTypeList = this.formTypeService.getAllFormTypes()

        Object.keys(FormTypeCat).forEach(key => {
            this.formTypeCategorieList.push(FormTypeCat[key])
        })
    }

    close(): void {
        this.dialogRef.close();
    }

    submit() {
        this.dialogRef.close(this.selectedFormType)
    }

    getFormTypeListByCategory(category: string): FormType[] {
        return this.formTypeList.filter(formtype => formtype.category.toString() == category)
    }
}