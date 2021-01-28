import { Validator, ValidatorFn } from "@angular/forms"
import { ErrorIdentifier } from "src/assets/errorIdentifier"
import { Rule } from "./Rule"

export class FormOptions {

    public toggleVis: boolean
    public editableText: boolean
    public radioOptions: string[]
    public rules: Rule[] = []

    constructor(public modelName: string, rules?: Rule[]) {
        this.rules = rules
    }

    getValidators(): ValidatorFn[] {
        const list: ValidatorFn[] = []

        this.rules.forEach(rule => {
            list.push(rule.validator)
        });

        return list
    }

    getErrorIdentifiers(): ErrorIdentifier[] {
        const list: ErrorIdentifier[] = []

        this.rules.forEach(rule => {
            list.push(rule.errorIdentifier)
        });

        return list
    }

    getErrorMessage(errorIdentifier: ErrorIdentifier): string {
        const rule = this.rules.filter((rule) => rule.errorIdentifier == errorIdentifier)[0]

        if(rule) {
            return rule.errorMessage
        } else {
            return ''
        }
    }
}