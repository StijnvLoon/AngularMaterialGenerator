import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationTransition, TransitionValues } from '../../models/AnimationTransition';

export interface DialogData {
    title: string
    sourceStateName: string
    targetStateName: string,
    transitionValues: TransitionValues
    availableStateNames: string[]
}

@Component({
    selector: 'animationtransition-dialog',
    templateUrl: './animation-transition.dialog.html',
    styleUrls: ['./animation-transition.dialog.scss']
})
export class AnimationTransitionDialog {

    transitionForm: FormGroup = new FormGroup({
        sourceStateControl: new FormControl(this.data.sourceStateName, [
            Validators.required
        ]),
        targetStateControl: new FormControl(this.data.targetStateName, [
            Validators.required
        ]),
        durationControl: new FormControl(this.data.transitionValues.duration, [
            Validators.required
        ]),
        targetCssControl: new FormControl(this.data.transitionValues.targetCSS, [
            Validators.required
        ]),
        easingFunctionControl: new FormControl(this.data.transitionValues.easingFunction)
    })

    constructor(
        public dialogRef: MatDialogRef<AnimationTransitionDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    close(): void {
        this.dialogRef.close();
    }

    submit(): void {
        this.dialogRef.close(this.transitionForm.value)
    }
}