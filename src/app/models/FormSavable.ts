import { ComponentRef } from '@angular/core'
import { FormOptions } from './FormOptions'

export class FormSavable {

    public getHTMLCode: any                 //callback method
    public getTSCode: any                   //callback method
    public getImports: any                  //callback method
    public view: ComponentRef<unknown>      //layout component is saved in here

    constructor(
        public name: any,
        public formOptions: FormOptions
    ) { }
}