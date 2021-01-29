import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { IFormType } from 'src/app/components/form-gen/formTypeComponents/IformType';
import { FormTypeHostDirective } from 'src/app/directives/form-type-host.directive';
import { FormOptions } from 'src/app/models/FormOptions';
import { FormSavable } from 'src/app/models/FormSavable';
import { FormComponentLibrary } from 'src/assets/formComponentLibrary';

@Component({
  selector: 'app-component-holder',
  templateUrl: './component-holder.component.html',
  styleUrls: ['./component-holder.component.scss']
})
export class ComponentHolderComponent implements OnInit {

  @Input() componentName: string
  @ViewChild(FormTypeHostDirective, { static: true }) appFormTypeHost: FormTypeHostDirective;

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    const formSavable: FormSavable = new FormSavable(FormComponentLibrary[this.componentName], new FormOptions(this.componentName, []))
    this.convertFormSavableToLayout(formSavable)
  }

  convertFormSavableToLayout(formSavable: FormSavable) {
    const factory = this.factoryResolver.resolveComponentFactory(formSavable.name)
    const componentRef: ComponentRef<any> = factory.create(this.appFormTypeHost.viewContainerRef.injector)
    const instance: IFormType = componentRef.instance

    instance.options = formSavable.formOptions
    instance.showPreview = true

    formSavable.view = componentRef

    this.appFormTypeHost.viewContainerRef.insert(componentRef.hostView)
  }

}
