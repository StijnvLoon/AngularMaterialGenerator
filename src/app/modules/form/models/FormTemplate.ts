import { FormSavable } from "./FormSavable"

export class FormTemplate {

    public name: string
    public formSavables: FormSavable[]

    constructor(name: string) {
        this.name = name
        this.formSavables = []
    }
}