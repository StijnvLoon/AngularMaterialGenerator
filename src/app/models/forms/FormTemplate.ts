import { IFormObjectType } from './IFormObject'

export class FormTemplate {

    public name: string
    public formObjectList: IFormObjectType[]

    constructor(name: string) {
        this.name = name
        this.formObjectList = []
    }
}