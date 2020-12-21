import { FormType, FormTypeImport } from '../../../models/formType'

export interface IFormType {
    getHTMLCode(formType?: FormType): string[]
    getImports(): FormTypeImport[]
}