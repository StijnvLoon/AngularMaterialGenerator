import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AddFormTypeDialog } from 'src/app/dialogs/addFormTypeDialog/add-formtype-dialog';
import { ConfirmDialog } from 'src/app/dialogs/confirmDialog/confirm-dialog';
import { FormTemplate } from 'src/app/models/formTemplate';
import { FormType } from 'src/app/models/formType';
import { FormTypeService } from 'src/app/services/form-type.service';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { FormTypeCompLoaderService } from 'src/app/services/form-type-comp-loader.service';
import { FormTypeHostDirective } from 'src/app/directives/form-type-host.directive';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss'],
  animations: [verticalListAnimation, verticalListItemAnimation]
})
export class FormEditorComponent implements OnInit {
  @ViewChild('drawer') sidenav: MatSidenav;
  @ViewChild(FormTypeHostDirective, {static: true}) appFormTypeHost: FormTypeHostDirective;

  @Input() formTemplate: FormTemplate
  public edittedFormType: FormType
  public tabIsActive: boolean = true

  constructor(
    private dialog: MatDialog,
    private formTypeService: FormTypeService,
    private formTypeCompLoaderService: FormTypeCompLoaderService,) {
     }

  ngOnInit(): void {
    //https://stackoverflow.com/questions/57616510/how-to-load-dynamic-components-based-on-a-property-from-object
    //https://angular.io/guide/dynamic-component-loader
    //https://medium.com/front-end-weekly/dynamically-add-components-to-the-dom-with-angular-71b0cb535286
    this.formTypeCompLoaderService.setRootViewContainerRef(this.appFormTypeHost.viewContainerRef)
    this.formTemplate.formTypeList.forEach(formType => {
      this.formTypeCompLoaderService.addDynamicComponent(formType.componentName, formType.options)
    });
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
        this.formTypeCompLoaderService.addDynamicComponent(object.componentName, object.options)
      }
    })
  }

  setEdittedFormType(formType: FormType) {
    this.edittedFormType = formType
    if(!this.sidenav.opened) {
      this.sidenav.toggle()
    }
  }

  removeFormType(formType: FormType) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '800px',
      data: {
        title: 'Are you sure you want to remove this form component?'
      }
    });

    dialogRef.afterClosed().subscribe(async bool => {
      if (bool) {
        this.formTemplate.formTypeList.splice(this.formTemplate.formTypeList.indexOf(formType), 1)
      }
    })

  }

  closeOptions() {
    this.sidenav.close()
    this.edittedFormType = undefined
  }

}
