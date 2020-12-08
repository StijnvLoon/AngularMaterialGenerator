import { FormType } from './formType'

export class FormTemplate {

    public name: string
    public formTypeList: FormType[]

    constructor(name: string) {
        this.name = name
        this.formTypeList = []
    }
}