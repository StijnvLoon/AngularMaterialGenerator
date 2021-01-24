import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string
    text: string
}

@Component({
    selector: 'text-dialog',
    templateUrl: './text-dialog.html',
    styleUrls: ['./text-dialog.scss']
})
export class TextDialog implements OnInit {

    public edittedText: string

    constructor(
        public dialogRef: MatDialogRef<TextDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    close(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.edittedText = this.data.text ? this.data.text : ''
    }

    submit() {
        this.dialogRef.close(this.edittedText)
    }
}