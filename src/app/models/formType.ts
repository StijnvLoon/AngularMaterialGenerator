import { FormTypeCat } from './enums/formTypeCat';

export class FormType {

    public readonly category: FormTypeCat
    public options: FormTypeOptions
    public readonly componentName

    constructor(componentName, category: FormTypeCat, options: FormTypeOptions) {
        this.category = category
        this.options = options,
        this.componentName = componentName
    }
}

export class FormTypeOptions {

    public toggleVis: boolean
    public editableText: boolean

    constructor(
        public readonly modelName: string
    ) { }
}

export class FormTypeImport {

    constructor(
        public readonly moduleName: string,
        public readonly importLocation: string
    ) { }
}