import { ComponentRef } from '@angular/core'
import { FormImport } from './FormImport'
import { FormOptions } from './FormOptions'

export class FormSavable {

    public getHTMLCode: (formGroupName: string) => string[]
    public getTSCode: () => string[]
    public getImports: () => FormImport[]
    public getCssCode: () => string[]
    public getFormControl: () => string[]
    public view: ComponentRef<unknown>                          //layout component is saved in here

    constructor(
        public name: any,
        public formOptions: FormOptions
    ) { }

    toJson(): IFormSavableJson {
        return {
            name: this.name,
            formOptions: this.formOptions
        }
    }
}

export interface IFormSavableJson {
    name: any,
    formOptions: FormOptions
}