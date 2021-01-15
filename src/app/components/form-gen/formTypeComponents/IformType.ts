import { EventEmitter } from '@angular/core';
import { FormOptions } from 'src/app/models/FormOptions';
import { FormCategoryLibrary } from 'src/assets/formComponentCategoryLibrary';

export interface IFormType {
    //the category
    readonly category: FormCategoryLibrary
    //the actual options
    options: FormOptions
    //there must be a preview for the picker dialog
    showPreview: boolean
    //the remove emitter
    onRemove: EventEmitter<any>
    //the edit toggle emitter
    onToggleEdit: EventEmitter<FormOptions>
    //for animations
    animState: string
    //to remove
    remove()
    //to toggle options menu
    toggleEdit()
    //retrieve html code
    getHTMLCodeCallback()
    //retrieve ts code
    getTSCodeCallback()
    //retrieve imports
    getImportsCallback()
}