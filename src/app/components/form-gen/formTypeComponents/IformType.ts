import { FormType, FormTypeImport } from '../../../models/formType'

export interface IFormType {
    remove()
    toggleEdit()
    getHTMLCode(formType?: FormType): string[]
    getImports(): FormTypeImport[]
}