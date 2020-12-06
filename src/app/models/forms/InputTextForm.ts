import { FormObject } from "./formObject";
import { IFormObject } from "./IFormObject";

export class InputTextForm extends FormObject implements IFormObject {

    constructor(name: string) {
        super(name)
    }

    public getCode(version: string): string {
        return "NOT IMPLEMENTED " + this.name;
    }

}