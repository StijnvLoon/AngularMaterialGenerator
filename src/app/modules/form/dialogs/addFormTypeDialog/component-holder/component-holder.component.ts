import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { IFormType } from 'src/app/modules/form/components/form-gen/formTypeComponents/IformType';
import { FormTypeHostDirective } from 'src/app/directives/form-type-host.directive';
import { FormOptions } from '../../../models/FormOptions';
import { FormSavable } from '../../../models/FormSavable';
import { FormTypeEnum, FormTypeService } from '../../../services/formtype.service';

@Component({
  selector: 'app-component-holder',
  templateUrl: './component-holder.component.html',
  styleUrls: ['./component-holder.component.scss']
})
export class ComponentHolderComponent implements OnInit {

  @Input() componentName: string
  @ViewChild(FormTypeHostDirective, { static: true }) appFormTypeHost: FormTypeHostDirective;

  constructor(private factoryResolver: ComponentFactoryResolver, private formtypeService: FormTypeService) { }

  ngOnInit(): void {
    const formSavable: FormSavable = new FormSavable(FormTypeEnum[this.componentName], new FormOptions(this.componentName, []))
    this.convertFormSavableToLayout(formSavable)
  }

  convertFormSavableToLayout(formSavable: FormSavable) {
    const factory = this.factoryResolver.resolveComponentFactory(this.formtypeService.getComponentByEnum(formSavable.name))
    const componentRef: ComponentRef<any> = factory.create(this.appFormTypeHost.viewContainerRef.injector)
    const instance: IFormType = componentRef.instance

    instance.options = formSavable.formOptions
    instance.showPreview = true

    formSavable.view = componentRef

    this.appFormTypeHost.viewContainerRef.insert(componentRef.hostView)
  }

}
