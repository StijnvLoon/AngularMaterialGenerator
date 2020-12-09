import { Injectable } from '@angular/core';
import { FormTypeKey } from '../models/enums/FormTypeKey';
import { FormTypeCat } from '../models/enums/formTypeCat';
import { FormType } from '../models/formType';

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

  private getOptions(key: FormTypeKey): any {
    switch (key) {
      case FormTypeKey.INPUT_PASSWORD: {
        return { modelName: "Example password", toggleVis: true }
      }
      case FormTypeKey.INPUT_DATE: {
        return { modelName: "Example date", editableText: true }
      }
      default: {
        return { modelName: "Example text" }
      }
    }
  }
}
