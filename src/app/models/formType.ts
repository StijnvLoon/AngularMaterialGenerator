import { FormTypeKey } from './enums/FormTypeKey';
import { FormTypeCat } from './enums/formTypeCat';

export class FormType {

    public readonly key: FormTypeKey
    public readonly category: FormTypeCat
    public options: FormTypeOptions
    public componentName

    constructor(key: FormTypeKey, category: FormTypeCat, options: FormTypeOptions, componentName) {
        this.key = key
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