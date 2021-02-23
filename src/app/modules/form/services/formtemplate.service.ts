import { Injectable } from '@angular/core';
import { ImportsLibrary } from 'src/assets/importsLibrary';
import { FormImport } from '../models/FormImport';
import { FormSavable } from '../models/FormSavable';
import { FormTemplate } from '../models/FormTemplate';

@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {

  constructor() { }

  downloadFormTemplateJSON(formTemplate: FormTemplate) {
    //ontwijken van callbacks in formsavable
    const templateCopy: FormTemplate = new FormTemplate(formTemplate.name)

    formTemplate.formSavables.forEach(formSavable => {
      templateCopy.formSavables.push(new FormSavable(
        formSavable.name,
        formSavable.formOptions
      ))
    });

    const json = JSON.stringify(templateCopy)
    const fileName = formTemplate.name + '.json'

    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(json));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  convertUploadedFile(file, cb, error) {
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = () => {
      const template: FormTemplate = JSON.parse(fileReader.result.toString())
      if (template.name == undefined) {
        error('No name found')
      }
      if (template.formSavables == undefined) {
        error('No savables found')
      }

      try {
        cb(template)
      } catch (err) {
        error(err)
      }
    }
    fileReader.onerror = (err) => {
      error(err)
    }
  }

  classNameToString(className: any): string {
    return className.toString().split(" ")[1]
  }

  getCodeName(formTemplate: FormTemplate) {
    return formTemplate.name.toLowerCase().replace(/\s/g, "")
  }

  public getImports(formTemplate: FormTemplate): FormImport[] {

    //default imports
    const imports: FormImport[] = [
        // ImportsLibrary.MATRADIOBUTTONMODULE
    ]

    formTemplate.formSavables.forEach(formSavable => {
        formSavable.getImports().forEach(formImport => {
            if(!imports.includes(formImport)) {
                imports.push(formImport)
            }
        });
    });

    return imports
}

}
