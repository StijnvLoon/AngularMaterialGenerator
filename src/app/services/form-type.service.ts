import { Injectable } from '@angular/core';
import { FormTypeKey } from '../models/enums/FormTypeKey';
import { FormTypeCat } from '../models/enums/formTypeCat';
import { FormType, FormTypeOptions } from '../models/formType';
import { DateInputComponent } from '../components/form-gen/formTypeComponents/date-input/date-input.component';
import { PasswordInputComponent } from '../components/form-gen/formTypeComponents/password-input/password-input.component';
import { TextInputComponent } from '../components/form-gen/formTypeComponents/text-input/text-input.component';

@Injectable({
  providedIn: 'root'
})
export class FormTypeService {

  public edittedFormTypeOptions: FormTypeOptions

  constructor() { }

  createFormType(key: FormTypeKey) {
    return new FormType(key, this.getCategory(key), this.getOptions(key), this.getComponentName(key))
  }

  getAllFormTypes(): FormType[] {
    const formTypeList: FormType[] = []
    Object.keys(FormTypeKey).forEach(key => {
      formTypeList.push(this.createFormType(FormTypeKey[key]))
    });
    return formTypeList
  }

  private getComponentName(key: FormTypeKey) {
    switch(key) {
      case FormTypeKey.INPUT_TEXT:
        return nameToComponentDict.textinput
      case FormTypeKey.INPUT_DATE:
        return nameToComponentDict.dateinput
      case FormTypeKey.INPUT_PASSWORD:
        return nameToComponentDict.passwordinput
    }
  }

  private getCategory(key: FormTypeKey): FormTypeCat {

    if (key == FormTypeKey.INPUT_TEXT ||
      key == FormTypeKey.INPUT_PASSWORD ||
      key == FormTypeKey.INPUT_DATE) {
      return FormTypeCat.INPUT
    } else {
      return FormTypeCat.NONE
    }
  }

  private getOptions(key: FormTypeKey): FormTypeOptions {
    switch (key) {
      case FormTypeKey.INPUT_TEXT:
        return new FormTypeOptions('Example text')
      case FormTypeKey.INPUT_PASSWORD: {
        const options: FormTypeOptions = new FormTypeOptions('Example password')
        options.toggleVis = true
        return options
      }
      case FormTypeKey.INPUT_DATE: {
        const options: FormTypeOptions = new FormTypeOptions('Example date')
        options.editableText = false
        return options
      }
      default: {
        return new FormTypeOptions('Example text')
      }
    }
  }
}

export const nameToComponentDict = {
  textinput: TextInputComponent,
  passwordinput: PasswordInputComponent,
  dateinput: DateInputComponent
}
