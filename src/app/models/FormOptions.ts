import { Validator, ValidatorFn } from "@angular/forms"
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
}