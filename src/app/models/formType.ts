import { FormTypeKey } from './enums/FormTypeKey';
import { FormTypeCat } from './enums/formTypeCat';

export class FormType {

    public readonly key: FormTypeKey
    public readonly category: FormTypeCat
    public options: FormTypeOptions

    constructor(key: FormTypeKey, category: FormTypeCat, options: FormTypeOptions) {
        this.key = key
        this.category = category
        this.options = options
    }
}

export class FormTypeOptions {

    public toggleVis: boolean
    public editableText: boolean

    constructor(
        public readonly modelName: string,
        public readonly imports: FormTypeImport[]
    ) { }
}

export class FormTypeImport {

    constructor(
        public readonly moduleName: string,
        public readonly importLocation: string
    ) { }
}