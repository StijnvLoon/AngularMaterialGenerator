import { EventEmitter } from '@angular/core';
import { FormType, FormTypeImport, FormTypeOptions } from '../../../models/formType'

export interface IFormType {
    //the actual options
    options: FormTypeOptions
    //there must be a preview for the picker dialog
    showPreview: boolean
    //the remove emitter
    onRemove: EventEmitter<any>
    //the toggle emitter
    onToggleEdit: EventEmitter<FormTypeOptions>
    //for animations
    animState: string
    //to remove
    remove()
    //to toggle options menu
    toggleEdit()
    //retrieve html code
    getHTMLCode(formType?: FormType): string[]
    //retrieve imports
    getImports(): FormTypeImport[]
}