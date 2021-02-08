import { ImportsLibrary } from "src/assets/importsLibrary"
import { FormImport } from "./FormImport"
import { FormSavable } from "./FormSavable"

export class FormTemplate {

    public name: string
    public formSavables: FormSavable[]

    constructor(name: string) {
        this.name = name
        this.formSavables = []
    }

    public addFormSavable(formSavable: FormSavable) {
        this.formSavables.push(formSavable)
    }

    public removeFormSavable(formSavable: FormSavable) {
        this.formSavables.splice(this.formSavables.indexOf(formSavable), 1)
    }

    public getImports(): FormImport[] {
        const imports: FormImport[] = [
            ImportsLibrary.MATRADIOBUTTONMODULE
        ]

        this.formSavables.forEach(formSavable => {
            formSavable.getImports().forEach(formImport => {
                if(!imports.includes(formImport)) {
                    imports.push(formImport)
                }
            });
        });

        return imports
    }

    public getCodeName() {
        return this.name.toLowerCase().replace(/\s/g, "-")
    }
}