import { ValidatorFn } from "@angular/forms"

export class Rule {

    constructor(public readonly validator: ValidatorFn, public readonly displayName: string) { }
}