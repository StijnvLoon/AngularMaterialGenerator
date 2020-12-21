import { ComponentFactoryResolver, Inject, Injectable, Input, ViewContainerRef } from '@angular/core';
import { TextInputComponent } from '../components/form-gen/formTypeComponents/text-input/text-input.component'
import { PasswordInputComponent } from '../components/form-gen/formTypeComponents/password-input/password-input.component'
import { DateInputComponent } from '../components/form-gen/formTypeComponents/date-input/date-input.component'
import { FormTypeOptions } from '../models/formType';

@Injectable({
  providedIn: 'root'
})
export class FormTypeCompLoaderService {

  private factoryResolver: ComponentFactoryResolver
  private rootViewContainer: ViewContainerRef

  constructor(factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicComponent(componentName, options: FormTypeOptions) {
    const factory = this.factoryResolver.resolveComponentFactory(componentName)
    const componentView = factory.create(this.rootViewContainer.injector)
    const instance = <any>componentView.instance
    instance.options = options
    this.rootViewContainer.insert(componentView.hostView)
  }
}

export const nameToComponentDict = {
  textinput: TextInputComponent,
  passwordinput: PasswordInputComponent,
  dateinput: DateInputComponent
}
