import { ErrorIdentifier } from "src/assets/errorIdentifier";

export class Rule {

    constructor(
        public readonly errorMessage: string,
        public readonly code: string,
        public readonly errorIdentifier: ErrorIdentifier,
        public readonly attr?: any
    ) { }

}