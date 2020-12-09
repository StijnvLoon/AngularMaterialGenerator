import { FormTypeKey } from './enums/FormTypeKey';
import { FormTypeCat } from './enums/formTypeCat';

export class FormType {

    public readonly key: FormTypeKey
    public readonly category: FormTypeCat
    public options: any

    constructor(key: FormTypeKey, category: FormTypeCat, options: any) {
        this.key = key
        this.category = category
        this.options = options
    }
}