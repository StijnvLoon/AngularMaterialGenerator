import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormTypeCat } from 'src/app/models/enums/formTypeCat';
import { FormTypeService, nameToComponentDict } from 'src/app/services/form-type.service';
import { FormType } from '../../models/formType';

export interface DialogData {
    title: string
}

@Component({
    selector: 'add-formtype-dialog',
    templateUrl: './add-formtype-dialog.html',
    styleUrls: ['./add-formtype-dialog.scss']
})
export class AddFormTypeDialog implements OnInit {

    selectedFormTypeList: FormType[] = [];
    formTypeCategorieMap: Map<FormTypeCat, FormType[]> = new Map()
    public nameToComponentDict = nameToComponentDict

    constructor(
        public dialogRef: MatDialogRef<AddFormTypeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public formTypeService: FormTypeService) {}

    ngOnInit() {
        this.formTypeCategorieMap = this.formTypeService.getAllFormTypesMapByCategory()
        nameToComponentDict.textinput
    }

    close(): void {
        this.dialogRef.close();
    }

    submit() {
        this.dialogRef.close(this.selectedFormTypeList)
    }

    toggleSelectedFormType(formType: FormType) {
        if (this.selectedFormTypeList.includes(formType)) {
            this.selectedFormTypeList.splice(this.selectedFormTypeList.indexOf(formType), 1)
        } else {
            this.selectedFormTypeList.push(formType)
        }
    }

    getChecked(formType): boolean {
        return this.selectedFormTypeList.includes(formType)
    }
}