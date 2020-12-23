import { FormType, FormTypeImport } from './formType'

export class FormTemplate {

    public name: string
    public formTypeList: FormType[]

    constructor(name: string) {
        this.name = name
        this.formTypeList = []
    }

    public getImports(): FormTypeImport[] {
        const imports: FormTypeImport[] = []

        this.formTypeList.forEach(formType => {
            new formType.componentName().getImports().forEach(formTypeImport => {
                if(!imports.includes(formTypeImport)) {
                    imports.push(formTypeImport)
                }
            });
        });

        return imports
    }
}