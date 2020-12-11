import { Injectable } from '@angular/core';
import { FormTypeKey } from '../models/enums/FormTypeKey';
import { FormTypeCat } from '../models/enums/formTypeCat';
import { FormType, FormTypeImport, FormTypeOptions } from '../models/formType';
import { ImportsLibrary } from '../models/importsLibrary';

@Injectable({
  providedIn: 'root'
})
export class FormTypeService {

  constructor() { }

  createFormType(key: FormTypeKey) {
    return new FormType(key, this.getCategory(key), this.getOptions(key))
  }

  getAllFormTypes(): FormType[] {
    const formTypeList: FormType[] = []
    Object.keys(FormTypeKey).forEach(key => {
      formTypeList.push(this.createFormType(FormTypeKey[key]))
    });
    return formTypeList
  }

  private getCategory(key: FormTypeKey): FormTypeCat {
    let category: FormTypeCat
    switch (key) {
      case FormTypeKey.INPUT_TEXT || FormTypeKey.INPUT_PASSWORD || FormTypeKey.INPUT_DATE: {
        category = FormTypeCat.INPUT
        break
      }
      default: {
        category = FormTypeCat.NONE
      }
    }

    return category
  }

  private getOptions(key: FormTypeKey): FormTypeOptions {
    switch (key) {
      case FormTypeKey.INPUT_TEXT:
        return new FormTypeOptions('Example text', [
          ImportsLibrary.MATINPUTMODULE
        ])
      case FormTypeKey.INPUT_PASSWORD: {
        const options: FormTypeOptions = new FormTypeOptions('Example password', [
          ImportsLibrary.MATINPUTMODULE,
          ImportsLibrary.MATICONMODULE
        ])
        options.toggleVis = true
        return options
      }
      case FormTypeKey.INPUT_DATE: {
        const options: FormTypeOptions = new FormTypeOptions('Example date', [
          ImportsLibrary.MATINPUTMODULE,
          ImportsLibrary.MATICONMODULE,
          ImportsLibrary.MATNATIVEDATEMODULE,
          ImportsLibrary.MATDATEPICKERMODULE
        ])
        options.editableText = false
        return options
      }
      default: {
        return new FormTypeOptions('Example text', [])
      }
    }
  }
}
