import { FormObject } from "./formObject";
import { IFormObjectType } from "./IFormObject";

export class InputTextForm extends FormObject implements IFormObjectType {

    constructor() {
        super("Input text")
    }

    public getCode(version?: string): string {
        return "<input />"
    }

}

export class InputPasswordForm extends FormObject implements IFormObjectType {

    constructor() {
        super("Input password")
    }

    public getCode(version?: string): string {
        return "NOT IMPLEMENTED " + this.name;
    }

}

export class InputDateForm extends FormObject implements IFormObjectType {

    constructor() {
        super("Input date")
    }

    public getCode(version?: string): string {
        return "NOT IMPLEMENTED " + this.name;
    }

}