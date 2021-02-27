import { Injectable } from '@angular/core';
import { FormSavable } from '../modules/form/models/FormSavable';
import { FormTemplate } from '../modules/form/models/FormTemplate';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private readonly formTemplateStorage: string = "formtemplates"
    private readonly themeStorage: string = "themes"

    constructor() { }

    saveFormTemplate(formTemplate: FormTemplate, isZeroIndex?: boolean): number {
        //ontwijken van callbacks in formsavable
        const templateCopy: FormTemplate = new FormTemplate(formTemplate.name)

        formTemplate.formSavables.forEach(formSavable => {
            templateCopy.formSavables.push(new FormSavable(
                formSavable.name,
                formSavable.formOptions
            ))
        });

        const json = JSON.stringify(templateCopy)
        const array = this.retrieveFormTemplateStringList()

        if (!isZeroIndex || array[0] == null) {
            array.push(json)
        } else {
            array[0] = json
        }

        localStorage.setItem(this.formTemplateStorage, JSON.stringify(array))
        return array.indexOf(json)
    }

    updateFormTemplate(index: number, formTemplate: FormTemplate) {
        //ontwijken van callbacks in formsavable
        const templateCopy: FormTemplate = new FormTemplate(formTemplate.name)

        formTemplate.formSavables.forEach(formSavable => {
            templateCopy.formSavables.push(new FormSavable(
                formSavable.name,
                formSavable.formOptions
            ))
        });

        const array = this.retrieveFormTemplateStringList()
        array[index] = JSON.stringify(templateCopy)
        localStorage.setItem(this.formTemplateStorage, JSON.stringify(array))
    }

    deleteFormTemplate(index: number) {
        const array = this.retrieveFormTemplateStringList()
        array.splice(index, 1)
        localStorage.setItem(this.formTemplateStorage, JSON.stringify(array))
    }

    getFormTemplate(index: number, onError): FormTemplate {
        const array = this.retrieveFormTemplateStringList()
        try {
            const template: FormTemplate = JSON.parse(array[index])
            return template
        } catch (err) {
            onError()
        }
    }

    getUserFormTemplateReferences(): any[] {
        const array = this.retrieveFormTemplateStringList()
        const templates = []

        for(let i = 0; i < array.length; i++) {
            if(i !== 0) {
                templates.push({
                    name: JSON.parse(array[i]).name,
                    id: i
                })
            }
        }

        return templates
    }

    private retrieveFormTemplateStringList(): string[] {
        const result = JSON.parse(localStorage.getItem(this.formTemplateStorage))

        if (result == null) {
            return []
        } else {
            return result
        }
    }
}