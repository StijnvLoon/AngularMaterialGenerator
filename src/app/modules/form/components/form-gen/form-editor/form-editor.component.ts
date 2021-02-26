import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { AddFormTypeDialog } from 'src/app/modules/form/dialogs/addFormTypeDialog/add-formtype-dialog';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { FormTypeHostDirective } from 'src/app/directives/form-type-host.directive';
import { IFormType } from '../formTypeComponents/IformType';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FormOptions } from '../../../models/FormOptions';
import { FormSavable } from '../../../models/FormSavable';
import { FormTemplate } from '../../../models/FormTemplate';
import { FormTypeService } from '../../../services/formtype.service';

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
  public activeFormOptions: FormOptions

  constructor(
    private dialog: MatDialog,
    private factoryResolver: ComponentFactoryResolver,
    public sidenavService: SidenavService,
    private formtypeService: FormTypeService) {
  }

  ngOnInit(): void {
    //https://stackoverflow.com/questions/57616510/how-to-load-dynamic-components-based-on-a-property-from-object
    //https://angular.io/guide/dynamic-component-loader
    //https://medium.com/front-end-weekly/dynamically-add-components-to-the-dom-with-angular-71b0cb535286
    this.refreshSavables()
  }

  refreshSavables(formTemplate?: FormTemplate) {
    this.appFormTypeHost.viewContainerRef.clear()

    if(formTemplate) {
      this.formTemplate = formTemplate
    }
    
    this.formTemplate.formSavables.forEach(formSavable => {
      this.convertFormSavableToLayout(formSavable)
    });
  }

  ngAfterViewInit() {
    this.sidenavService.sidenav = this.sidenav
  }

  convertFormSavableToLayout(formSavable: FormSavable) {
    const factory = this.factoryResolver.resolveComponentFactory(this.formtypeService.getComponentByEnum(formSavable.name))
    const componentRef: ComponentRef<any> = factory.create(this.appFormTypeHost.viewContainerRef.injector)
    const instance: IFormType = componentRef.instance

    instance.options = formSavable.formOptions
    instance.onRemove.subscribe(() => {
      this.removeFormSavable(formSavable)
    })
    instance.onToggleEdit.subscribe((options) => {
      this.sidenavService.toggle(options)
    })

    formSavable.view = componentRef
    formSavable.getHTMLCode = instance.getHTMLCodeCallback()
    formSavable.getTSCode = instance.getTSCodeCallback()
    formSavable.getImports = instance.getImportsCallback()
    formSavable.getFormControl = instance.getFormControlCallback()
    formSavable.getCssCode = instance.getCssCodeCallback()

    this.appFormTypeHost.viewContainerRef.insert(componentRef.hostView)
  }

  removeFormSavable(formSavable: FormSavable) {
    //remove from layout
    this.appFormTypeHost.viewContainerRef.remove(this.appFormTypeHost.viewContainerRef.indexOf(formSavable.view.hostView))
    //remove from formtemplate
    this.formTemplate.formSavables.splice(this.formTemplate.formSavables.indexOf(formSavable), 1)
  }


  addFormObjectDialog() {
    const dialogRef = this.dialog.open(AddFormTypeDialog, {
      width: '80%',
      data: {
        title: 'Add form component'
      }
    });

    dialogRef.afterClosed().subscribe(async formNames => {
      if (formNames) {

        formNames.forEach(formName => {
          const formSavable = new FormSavable(formName, new FormOptions(formName + ' model'))
          this.formTemplate.formSavables.push(formSavable)
          this.convertFormSavableToLayout(formSavable)
        });
      }
    })
  }

  drop(event) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    
    this.appFormTypeHost.viewContainerRef.move(
      event.container.data[event.currentIndex].view.hostView,
      event.currentIndex
    )
  }
}
