import { Component, Inject, OnInit } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rule } from 'src/app/models/Rule';
import { ErrorIdentifier } from 'src/assets/errorIdentifier';

export interface DialogData {
    title: string,
    occupiedIdentifiers: ErrorIdentifier[]
}

@Component({
    selector: 'add-rule-dialog',
    templateUrl: './add-rule-dialog.html',
    styleUrls: ['./add-rule-dialog.scss']
})
export class AddRuleDialog implements OnInit {

    availableIdentifiers: ErrorIdentifier[] = []
    selectedIdentifier: ErrorIdentifier
    chosenAmount: number = 0
    errorMessage: string = ''
    regexString: string = ''

    constructor(
        public dialogRef: MatDialogRef<AddRuleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {

        Object.keys(ErrorIdentifier).forEach((identifier) => {
            if (!this.data.occupiedIdentifiers.includes(ErrorIdentifier[identifier])) {
                this.availableIdentifiers.push(ErrorIdentifier[identifier])
            }
        })
    }

    close(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

    }

    submit() {
        console.log(this.getCode())
        var rule: Rule = new Rule(this.getValidator(), this.errorMessage, this.selectedIdentifier, this.getCode());
        this.dialogRef.close(rule)
    }

    selectionIsNumber(): boolean {
        return this.selectedIdentifier == ErrorIdentifier.MIN ||
            this.selectedIdentifier == ErrorIdentifier.MAX ||
            this.selectedIdentifier == ErrorIdentifier.MINLENGTH ||
            this.selectedIdentifier == ErrorIdentifier.MAXLENGTH
    }

    selectionIsPattern(): boolean {
        return this.selectedIdentifier == ErrorIdentifier.PATTERN
    }

    getCode(): string {
        if(this.selectionIsPattern()) {
            return '      Validators.' + this.selectedIdentifier + '(' + this.regexString + ')'
        }
        if(this.selectionIsNumber()) {
            return '      Validators.' + this.selectedIdentifier + '(' + this.chosenAmount + ')' 
        }
        return '      Validators.' + this.selectedIdentifier
    }

    getValidator(): ValidatorFn {

        switch (this.selectedIdentifier) {
            case ErrorIdentifier.REQUIRED: {
                return Validators.required
            }
            case ErrorIdentifier.MIN: {
                return Validators.min(this.chosenAmount)
            }
            case ErrorIdentifier.MAX: {
                return Validators.max(this.chosenAmount)
            }
            case ErrorIdentifier.MINLENGTH: {
                return Validators.minLength(this.chosenAmount)
            }
            case ErrorIdentifier.MAXLENGTH: {
                return Validators.maxLength(this.chosenAmount)
            }
            case ErrorIdentifier.PATTERN: {
                return Validators.pattern(this.regexString)
            }
            case ErrorIdentifier.REQUIREDTRUE: {
                return Validators.requiredTrue
            }
            case ErrorIdentifier.EMAIL: {
                return Validators.email
            }
        }
    }
}