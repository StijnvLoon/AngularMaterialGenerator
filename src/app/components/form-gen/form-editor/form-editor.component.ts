import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AddFormTypeDialog } from 'src/app/dialogs/addFormTypeDialog/add-formtype-dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormTemplate } from 'src/app/models/formTemplate';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { FormTypeHostDirective } from 'src/app/directives/form-type-host.directive';
import { IFormType } from '../formTypeComponents/IformType';
import { FormSavable } from 'src/app/models/FormSavable';

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
  public tabIsActive: boolean = true


  constructor(
    private dialog: MatDialog,
    private factoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    //https://stackoverflow.com/questions/57616510/how-to-load-dynamic-components-based-on-a-property-from-object
    //https://angular.io/guide/dynamic-component-loader
    //https://medium.com/front-end-weekly/dynamically-add-components-to-the-dom-with-angular-71b0cb535286
    this.formTemplate.formSavables.forEach(formSavable => {
      this.convertFormSavableToLayout(formSavable)
    });
  }

  convertFormSavableToLayout(formSavable: FormSavable) {
    const factory = this.factoryResolver.resolveComponentFactory(formSavable.name)
    const componentRef: ComponentRef<any>= factory.create(this.appFormTypeHost.viewContainerRef.injector)
    const instance: IFormType = componentRef.instance

    instance.options = formSavable.formOptions
    instance.onRemove.subscribe(() => {
      this.removeFormSavable(formSavable)
    })
    instance.onToggleEdit.subscribe((options) => {
      //this.toggleOptionsDrawer(options)
    })

    formSavable.view = componentRef
    formSavable.getHTMLCode = instance.getHTMLCodeCallback()

    this.appFormTypeHost.viewContainerRef.insert(componentRef.hostView)
  }

  removeFormSavable(formSavable: FormSavable) {
    //remove from layout
    this.appFormTypeHost.viewContainerRef.remove(this.appFormTypeHost.viewContainerRef.indexOf(formSavable.view.hostView))
    //remove from formtemplate
    this.formTemplate.removeFormSavable(formSavable)
  }


  addFormObjectDialog() {
    const dialogRef = this.dialog.open(AddFormTypeDialog, {
      width: '800px',
      data: {
        title: 'Add form component'
      }
    });

    // dialogRef.afterClosed().subscribe(async formTypeList => {
    //   if (formTypeList) {

    //     formTypeList.forEach(formType => {
    //       const object: FormType = this.formTypeService.createFormType(formType.componentName)
    //       this.formTemplate.formTypeList.push(object)
    //       this.convertFormSavableToLayout(object)
    //     });
    //   }
    // })
  }

  // toggleOptionsDrawer(formTypeOptions?: FormTypeOptions) {
  //   if (this.sidenav.opened && formTypeOptions == undefined) {
  //     this.closeOptions()
  //   } else if (this.formTypeService.edittedFormTypeOptions == formTypeOptions) {
  //     this.closeOptions()
  //   } else {
  //     this.formTypeService.edittedFormTypeOptions = formTypeOptions
  //     this.sidenav.open()
  //   }
  // }

  closeOptions() {
    this.sidenav.close()
    //this.formTypeService.edittedFormTypeOptions = undefined
  }
}
