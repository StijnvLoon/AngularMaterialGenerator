import { Injectable } from '@angular/core';
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

  createFormType(className): FormType {
    return this.getAllFormTypes().filter((formType) => formType.componentName == className)[0]
  }

  getAllFormTypesMapByCategory(): Map<FormTypeCat, FormType[]> {
    const map: Map<FormTypeCat, FormType[]> = new Map()

    this.getAllFormTypes().forEach((formType) => {
      try {
        map.get(formType.category).push(formType)
      } catch(err) {
        map.set(formType.category, [formType])
      }
    })

    return map
  }

  getAllFormTypes(): FormType[] {
    return [
      this.createTextInputType(),
      this.createPasswordInputType(),
      this.createDateInputType()
    ]
  }

  private createTextInputType(): FormType {
    const options = new FormTypeOptions('Example text')
    return new FormType(nameToComponentDict.textinput, FormTypeCat.INPUT, options)
  }

  private createPasswordInputType(): FormType {
    const options = new FormTypeOptions('Example password')
    options.toggleVis = true
    return new FormType(nameToComponentDict.passwordinput, FormTypeCat.INPUT, options)
  }

  private createDateInputType(): FormType {
    const options = new FormTypeOptions('Example date')
    options.editableText = false
    return new FormType(nameToComponentDict.dateinput, FormTypeCat.INPUT, options)
  }
}

export const nameToComponentDict = {
  textinput: TextInputComponent,
  passwordinput: PasswordInputComponent,
  dateinput: DateInputComponent
}
