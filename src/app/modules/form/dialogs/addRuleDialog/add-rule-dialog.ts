import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorIdentifier } from 'src/assets/errorIdentifier';
import { Rule } from '../../models/Rule';
import { RuleService } from '../../services/rule.service';

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
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private ruleService: RuleService) {

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
        var rule;
        if(this.selectionIsPattern()) {
            rule = new Rule(this.errorMessage, this.getCode(), this.selectedIdentifier, this.regexString);
        } else if (this.selectionIsNumber()) {
            rule = new Rule(this.errorMessage, this.getCode(), this.selectedIdentifier, this.chosenAmount);
        } else {
            rule = new Rule(this.errorMessage, this.getCode(), this.selectedIdentifier);
        }
        
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
            return '      Validators.' + this.selectedIdentifier + '(' + this.regexString.replace('\\', '\\\\') + ')'
        }
        if(this.selectionIsNumber()) {
            return '      Validators.' + this.selectedIdentifier + '(' + this.chosenAmount + ')' 
        }
        return '      Validators.' + this.selectedIdentifier
    }
}