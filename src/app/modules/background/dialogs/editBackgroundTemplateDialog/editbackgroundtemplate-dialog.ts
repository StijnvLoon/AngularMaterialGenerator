import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string
    name: string
    widthRatio: number
    heightRatio: number
    backgroundColor: string
}

@Component({
    selector: 'editbackgroundtemplate-dialog',
    templateUrl: './editbackgroundtemplate-dialog.html',
    styleUrls: ['./editbackgroundtemplate-dialog.scss']
})
export class EditBackgroundTemplateDialog implements OnInit {

    backgroundTemplateForm = new FormGroup({
        nameControl: new FormControl(this.data.name, [
          Validators.required,
          Validators.maxLength(60),
        ]),
        width_ratioControl: new FormControl(this.data.widthRatio, [
          Validators.min(1),
          Validators.max(20),
          Validators.required,
        ]),
        height_ratioControl: new FormControl(this.data.heightRatio, [
          Validators.min(1),
          Validators.max(20),
          Validators.required,
        ]),
        background_colorControl: new FormControl(this.data.backgroundColor),
      })

    constructor(
        public dialogRef: MatDialogRef<EditBackgroundTemplateDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    close(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

    }

    submit() {
        this.dialogRef.close(this.backgroundTemplateForm.value)
    }
}