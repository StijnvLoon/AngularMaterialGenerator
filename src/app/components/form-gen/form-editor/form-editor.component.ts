import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AddFormTypeDialog } from 'src/app/dialogs/addFormTypeDialog/add-formtype-dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormTemplate } from 'src/app/models/formTemplate';
import { FormType, FormTypeOptions } from 'src/app/models/formType';
import { FormTypeService } from 'src/app/services/form-type.service';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { FormTypeHostDirective } from 'src/app/directives/form-type-host.directive';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss'],
  animations: [verticalListAnimation, verticalListItemAnimation]
})
export class FormEditorComponent implements OnInit {
  @ViewChild('drawer') sidenav: MatSidenav;
  @ViewChild(FormTypeHostDirective, { static: true }) appFormTypeHost: FormTypeHostDirective;

  @Input() formTemplate: FormTemplate
  //public edittedOptions: FormTypeOptions
  public tabIsActive: boolean = true
  
  private formTypeComponentMap: Map<FormType, ComponentRef<unknown>> = new Map()

  constructor(
    private dialog: MatDialog,
    public formTypeService: FormTypeService,
    private factoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    //https://stackoverflow.com/questions/57616510/how-to-load-dynamic-components-based-on-a-property-from-object
    //https://angular.io/guide/dynamic-component-loader
    //https://medium.com/front-end-weekly/dynamically-add-components-to-the-dom-with-angular-71b0cb535286
    this.formTemplate.formTypeList.forEach(formType => {
      this.addFormTypeComponent(formType)
    });
  }

  addFormTypeComponent(formType: FormType) {
    const factory = this.factoryResolver.resolveComponentFactory(formType.componentName)
    const componentRef: ComponentRef<unknown> = factory.create(this.appFormTypeHost.viewContainerRef.injector)
    const instance = <any>componentRef.instance

    instance.options = formType.options
    instance.onRemove.subscribe(() => {
      this.removeFormTypeComponent(formType)
    })
    instance.onToggleEdit.subscribe((options) => {
      this.toggleOptionsDrawer(options)
    })

    this.formTypeComponentMap.set(formType, componentRef)
    this.appFormTypeHost.viewContainerRef.insert(componentRef.hostView)
  }

  removeFormTypeComponent(formType: FormType) {
    //remove from layout
    this.appFormTypeHost.viewContainerRef.remove(this.appFormTypeHost.viewContainerRef.indexOf(this.formTypeComponentMap.get(formType).hostView))
    //remove from formtemplate
    this.formTemplate.formTypeList.splice(this.formTemplate.formTypeList.indexOf(formType), 1)
    //remove from map
    this.formTypeComponentMap.delete(formType)
  }


  addFormObjectDialog() {
    const dialogRef = this.dialog.open(AddFormTypeDialog, {
      width: '800px',
      data: {
        title: 'Add form component'
      }
    });

    dialogRef.afterClosed().subscribe(async formType => {
      if (formType) {
        const object: FormType = this.formTypeService.createFormType(formType.key)
        this.formTemplate.formTypeList.push(object)
        this.addFormTypeComponent(object)
      }
    })
  }

  toggleOptionsDrawer(formTypeOptions?: FormTypeOptions) {
    if(this.sidenav.opened && formTypeOptions == undefined) {
      this.formTypeService.edittedFormTypeOptions = undefined
      this.sidenav.close()
    } else {
      this.formTypeService.edittedFormTypeOptions = formTypeOptions
      this.sidenav.open()
    }
  }

  closeOptions() {
    this.sidenav.close()
    this.formTypeService.edittedFormTypeOptions = undefined
  }

}
