import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CssValue } from '../../models/CssValue';
import { JSONLib }from 'src/assets/jsonLibrary';

export interface DialogData {
    title: string
    name: string
    values: CssValue[]
    stateNames: string[]
}

@Component({
    selector: 'animationstate-dialog',
    templateUrl: './animation-state.dialog.html',
    styleUrls: ['./animation-state.dialog.scss']
})
export class AnimationStateDialog {

    cssKeys: string[] = [
        'height',
        'width',
        'color',
        'background',
        'border',
        'transform',
        'opacity',
        'border-radius'
    ]

    nameFormControl: FormControl = new FormControl(this.data.name, [
        Validators.required,
        Validators.maxLength(20)
    ])

    constructor(
        public dialogRef: MatDialogRef<AnimationStateDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    close(): void {
        this.dialogRef.close();
    }

    submit(): void {
        this.dialogRef.close({
            name: this.nameFormControl.value,
            values: this.data.values
        })
    }

    addCss(cssKey: string) {
        this.data.values.push(new CssValue(cssKey, ''))
    }

    removeValue(cssValue: CssValue) {
        this.data.values.splice(this.data.values.indexOf(cssValue), 1)
    }

    getAvailableCss(): string[] {
        return this.cssKeys.filter(key => 
            !this.data.values.some(x => x.key == key)
        )
    }

    nameIsOccupied(): boolean {
        if(this.data.name == this.nameFormControl.value) {
            return false
        } else {
            return this.data.stateNames.some(x => x == this.nameFormControl.value)
        }
    }

    getErrorMessage(): string {
        if(this.nameIsOccupied()) {
            return 'name is occupied'
        } else {
            return 'the rest'
        }
    }
}