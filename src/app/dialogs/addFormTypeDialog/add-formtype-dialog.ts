import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormOptions } from 'src/app/models/FormOptions';
import { FormSavable } from 'src/app/models/FormSavable';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';
import { FormComponentLibrary } from 'src/assets/formComponentLibrary';

export interface DialogData {
    title: string
}

@Component({
    selector: 'add-formtype-dialog',
    templateUrl: './add-formtype-dialog.html',
    styleUrls: ['./add-formtype-dialog.scss']
})
export class AddFormTypeDialog implements OnInit {

    public categories: string[] = Object.keys(FormCategoryLibrary)
    public components: string[] = Object.keys(FormComponentLibrary)
    public formCategoryLibrary = FormCategoryLibrary

    public selectedFormNameList: string[] = []

    constructor(
        public dialogRef: MatDialogRef<AddFormTypeDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        }
  
    close(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

    }

    submit() {
        this.dialogRef.close(this.selectedFormNameList)
    }

    toggleSelectedFormName(formName: string) {
        if (this.selectedFormNameList.includes(formName)) {
            this.selectedFormNameList.splice(this.selectedFormNameList.indexOf(formName), 1)
        } else {
            this.selectedFormNameList.push(formName)
        }
    }

    getChecked(formName): boolean {
        return this.selectedFormNameList.includes(formName)
    }

    getComponentsByCategory(category: string) {
        return this.components.filter((component) => {
            return new FormComponentLibrary[component]().category.toString() == FormCategoryLibrary[category]
        })
    }
}