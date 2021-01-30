import { ValidatorFn } from "@angular/forms"
import { ErrorIdentifier } from "src/assets/errorIdentifier";

export class Rule {

    constructor(
        public readonly validator: ValidatorFn,
        public readonly errorMessage: string,
        public readonly errorIdentifier: ErrorIdentifier,
        public readonly code: string
    ) { }
}